import { GoogleGenAI, Type, createPartFromUri } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";
import { fileURLToPath } from "url";
import { dirname } from "path";

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const localPdfFilePath = "/Users/aritra/Downloads/Syllabus.pdf";
  // --- Start: File Upload and Processing Logic ---
  console.log(`Uploading file from: ${localPdfFilePath}`);
  const file = await ai.files.upload({
    file: localPdfFilePath, // Use the local file path here
    config: {
      displayName: "Syllabus Civil.pdf", // Optional: A display name for the file in Google Cloud
    },
  });
  console.log(`File uploaded. Name: ${file.name}, URI: ${file.uri}`);

  // Wait for the file to be processed.
  let getFile = await ai.files.get({ name: file.name });
  while (getFile.state === "PROCESSING") {
    console.log(`Current file status: ${getFile.state}`);
    console.log("File is still processing, retrying in 5 seconds...");
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
    getFile = await ai.files.get({ name: file.name }); // Re-fetch file status
  }

  if (getFile.state === "FAILED") {
    throw new Error(
      "File processing failed for " + file.name + ". State: " + getFile.state
    );
  }
  console.log(`File processing complete. Final state: ${getFile.state}`);
  // --- End: File Upload and Processing Logic ---

  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      required: ["subjects"],
      properties: {
        subjects: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ["id", "subject_name", "modules"],
            properties: {
              id: {
                type: Type.NUMBER,
              },
              subject_name: {
                type: Type.STRING,
              },
              modules: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  required: ["module_id", "module_name"],
                  properties: {
                    module_id: {
                      type: Type.NUMBER,
                    },
                    module_name: {
                      type: Type.STRING,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    systemInstruction: [
      {
        text: `You are a Head of Department of a Undergraduate or Graduate College, you are presented with a syllabus PDF which will contain Multiple Subject Names, Each Subject Can Contain Multiple Modules. Your first task is to identify each subject_name, and each module_name. 
subject_name will be the title of the subject and module_name will be the first few bold/highlighted words of a module content. If the subject_name or module_name consists 'laboratory related words' then skip it. 
your second task is to identify the subjects where, subject_name or one of the module_name inside that subject related to the following topic(s): "Enviromental Engineering".

In the final JSON, only output the subjects when in the subject_name or module_name related topics is/are found. In a subject_name which consists related topics include only the modules which are directly related, or strictly neceassary to study further. subject_name or module_name should not be longer than 20 words, In that case, summarise it. id and module_id should start with 0 (integer), increment by 1 for each subject or modules.

Response with ONLY JSON`,
      },
    ],
  };
  const model = "gemini-2.5-flash-lite";

  // Construct the user parts with the uploaded file URI
  const userParts = [
    createPartFromUri(getFile.uri, getFile.mimeType), // Corrected this line
    {
      text: `Now, process the provided PDF data based on the instructions.`, // A prompt to trigger processing
    },
  ];

  const contents = [
    {
      role: "user",
      parts: userParts, // Use the dynamically created userParts
    },
    {
      role: "model",
      parts: [
        {
          text: `{
  "subjects": [
    {
      "id": 0,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Fluid Mechanics Laboratory"
        },
        {
          "module_id": 1,
          "module_name": "Computer-Aided Civil Engineering Drawing"
        }
      ],
      "subject_name": "Fluid Mechanics and Hydraulic Machines Laboratory"
    },
    {
      "id": 1,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Fluid Mechanics Laboratory"
        }
      ],
      "subject_name": "Fluid Mechanics and Hydraulic Machines Laboratory"
    },
    {
      "id": 2,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction to computer aided drawing"
        },
        {
          "module_id": 1,
          "module_name": "SYMBOLS AND SIGN CONVENTIONS"
        }
      ],
      "subject_name": "COMPUTER-AIDED CIVIL ENGINEERING DRAWING"
    },
    {
      "id": 3,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction: Principles of design of reinforced concrete members"
        },
        {
          "module_id": 1,
          "module_name": "Working stress method of design"
        },
        {
          "module_id": 2,
          "module_name": "Limit state method of design"
        }
      ],
      "subject_name": "DESIGN OF RCC STRUCTURES"
    },
    {
      "id": 4,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Analysis of statically Indeterminate Structures"
        }
      ],
      "subject_name": "STRUCTURAL ANALYSIS – II"
    },
    {
      "id": 5,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Compaction of Soil: Principles of Compaction"
        },
        {
          "module_id": 1,
          "module_name": "Compressibility & Consolidation of Soil"
        },
        {
          "module_id": 2,
          "module_name": "Shear Strength of Soil"
        },
        {
          "module_id": 3,
          "module_name": "Earth Pressure Theories"
        }
      ],
      "subject_name": "SOIL MECHANICS II"
    },
    {
      "id": 6,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Retaining Wall: Principal types of retaining walls"
        }
      ],
      "subject_name": "SOIL MECHANICS II"
    },
    {
      "id": 7,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Sewage and Drainage"
        },
        {
          "module_id": 1,
          "module_name": "Sewage and Drainage Quantity"
        },
        {
          "module_id": 2,
          "module_name": "Conveyance of Sewage Sewers"
        },
        {
          "module_id": 3,
          "module_name": "Wastewater Characteristics"
        },
        {
          "module_id": 4,
          "module_name": "Wastewater Treatment"
        },
        {
          "module_id": 5,
          "module_name": "Sludge Handling and Disposal"
        }
      ],
      "subject_name": "Environmental Engineering II"
    },
    {
      "id": 8,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Building Plumbing"
        },
        {
          "module_id": 1,
          "module_name": "Solid and hazardous waste"
        }
      ],
      "subject_name": "Environmental Engineering II"
    },
    {
      "id": 9,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction to Highway Engineering and Planning of Highway"
        }
      ],
      "subject_name": "TRANSPORTATION ENGINEERING"
    },
    {
      "id": 10,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Pavement Design"
        }
      ],
      "subject_name": "PAVEMENT DESIGN AND CONSTRUCTION"
    },
    {
      "id": 11,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Soil Exploration and Site Investigation"
        },
        {
          "module_id": 1,
          "module_name": "Shallow Foundations"
        },
        {
          "module_id": 2,
          "module_name": "Deep Foundations"
        },
        {
          "module_id": 3,
          "module_name": "Retaining walls and sheet pile structures"
        },
        {
          "module_id": 4,
          "module_name": "Design of foundation for vibration control"
        },
        {
          "module_id": 5,
          "module_name": "Foundations on expansive soils"
        }
      ],
      "subject_name": "ADVANCED FOUNDATION ENGINEERING"
    },
    {
      "id": 12,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction of Pre-stressed concrete: Materials"
        }
      ],
      "subject_name": "PRE-STRESSED CONCRETE"
    },
    {
      "id": 13,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction to Finite Element Analysis"
        }
      ],
      "subject_name": "FINITE ELEMENT METHOD"
    },
    {
      "id": 14,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction: Overview of distress, deterioration in concrete structures"
        },
        {
          "module_id": 1,
          "module_name": "Deterioration of concrete structures"
        },
        {
          "module_id": 2,
          "module_name": "Conditional/damage assessment & Evaluation of structures"
        },
        {
          "module_id": 3,
          "module_name": "Repairs, rehabilitation & Retrofitting of concrete structures"
        }
      ],
      "subject_name": "REPAIR & REHABILITATION OF STRUCTURES"
    },
    {
      "id": 15,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Air Pollutants"
        },
        {
          "module_id": 1,
          "module_name": "Air Pollution Meteorology"
        },
        {
          "module_id": 2,
          "module_name": "Dispersion of Air Pollutants"
        },
        {
          "module_id": 3,
          "module_name": "Air Quality"
        },
        {
          "module_id": 4,
          "module_name": "Air Pollution Control"
        },
        {
          "module_id": 5,
          "module_name": "Physics of Noise"
        },
        {
          "module_id": 6,
          "module_name": "Measurement of Noise"
        },
        {
          "module_id": 7,
          "module_name": "Source and Effect of Noise"
        },
        {
          "module_id": 8,
          "module_name": "Noise Pollution Control"
        }
      ],
      "subject_name": "AIR AND NOISE POLLUTION AND CONTROL"
    },
    {
      "id": 16,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction and Basic Concepts"
        },
        {
          "module_id": 1,
          "module_name": "Aeration"
        },
        {
          "module_id": 2,
          "module_name": "Plain Sedimentation"
        },
        {
          "module_id": 3,
          "module_name": "Clariflocculation"
        },
        {
          "module_id": 4,
          "module_name": "Filtration"
        },
        {
          "module_id": 5,
          "module_name": "Disinfection"
        },
        {
          "module_id": 6,
          "module_name": "Precipitation"
        },
        {
          "module_id": 7,
          "module_name": "Adsorption"
        },
        {
          "module_id": 8,
          "module_name": "Ion Exchange Processes"
        },
        {
          "module_id": 9,
          "module_name": "Membrane Processes"
        }
      ],
      "subject_name": "PHYSICO-CHEMICAL PROCESSES FOR WATER AND WASTEWATER TREATMENT"
    },
    {
      "id": 17,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction to Water Quality Models"
        },
        {
          "module_id": 1,
          "module_name": "Dissolved Oxygen Model for Streams"
        },
        {
          "module_id": 2,
          "module_name": "Models for Estuary and Lakes"
        },
        {
          "module_id": 3,
          "module_name": "Introduction to Air Quality Models"
        },
        {
          "module_id": 4,
          "module_name": "Dispersion Models"
        },
        {
          "module_id": 5,
          "module_name": "Air Quality Models"
        }
      ],
      "subject_name": "WATER AND AIR QUALITY MODELLING"
    },
    {
      "id": 18,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Basics of Structural Dynamics"
        },
        {
          "module_id": 1,
          "module_name": "Free Vibration of SDOF"
        },
        {
          "module_id": 2,
          "module_name": "Force Transmission, Isolation and Vibration Measurement"
        },
        {
          "module_id": 3,
          "module_name": "Response to Arbitrary Excitations"
        },
        {
          "module_id": 4,
          "module_name": "Multi-Degree of Freedom Systems"
        },
        {
          "module_id": 5,
          "module_name": "Generalized Coordinates and Rayleigh’s Method"
        },
        {
          "module_id": 6,
          "module_name": "Elements of seismology"
        },
        {
          "module_id": 7,
          "module_name": "Principles of earthquake resistant design"
        }
      ],
      "subject_name": "STRUCTURAL DYNAMICS AND EARTHQUAKE ENGINEERING"
    },
    {
      "id": 19,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Matrix methods of structural analysis"
        },
        {
          "module_id": 1,
          "module_name": "Finite difference and relaxation technique"
        },
        {
          "module_id": 2,
          "module_name": "Theory of plate bending"
        },
        {
          "module_id": 3,
          "module_name": "Theory of Elasticity"
        }
      ],
      "subject_name": "ADVANCE STRUCTURAL ANALYSIS"
    },
    {
      "id": 20,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Overall Review of RC Design"
        },
        {
          "module_id": 1,
          "module_name": "Analysis and Design of beams curved in plan"
        },
        {
          "module_id": 2,
          "module_name": "Flat slabs"
        },
        {
          "module_id": 3,
          "module_name": "Deep beams"
        },
        {
          "module_id": 4,
          "module_name": "Water tank"
        },
        {
          "module_id": 5,
          "module_name": "Raft Foundation"
        },
        {
          "module_id": 6,
          "module_name": "Design of folded plate"
        },
        {
          "module_id": 7,
          "module_name": "Design of shear wall as per IS 13920"
        },
        {
          "module_id": 8,
          "module_name": "Design of bunkers and silos"
        },
        {
          "module_id": 9,
          "module_name": "Analysis and design of chimneys"
        }
      ],
      "subject_name": "INDUSTRIAL STRUCTURE"
    },
    {
      "id": 21,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction"
        },
        {
          "module_id": 1,
          "module_name": "Loads"
        },
        {
          "module_id": 2,
          "module_name": "Bearings"
        },
        {
          "module_id": 3,
          "module_name": "Design of reinforced concrete solid slab bridge"
        },
        {
          "module_id": 4,
          "module_name": "Design of box culvert bridge"
        },
        {
          "module_id": 5,
          "module_name": "Design of a T beam bridge"
        },
        {
          "module_id": 6,
          "module_name": "Design of composite bridge"
        },
        {
          "module_id": 7,
          "module_name": "Design of cable stayed bridge"
        }
      ],
      "subject_name": "BRIDGE ENGINEERING"
    },
    {
      "id": 22,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction Urban morphology"
        },
        {
          "module_id": 1,
          "module_name": "Urban Transportation Planning"
        },
        {
          "module_id": 2,
          "module_name": "Scope of UTP in present scenario"
        }
      ],
      "subject_name": "URBAN TRANSPORTATION PLANNING"
    },
    {
      "id": 23,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Railway Engineering"
        },
        {
          "module_id": 1,
          "module_name": "Airport Engineering"
        }
      ],
      "subject_name": "RAILWAY AND AIRPORT ENGINEERING"
    },
    {
      "id": 24,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction"
        },
        {
          "module_id": 1,
          "module_name": "Modelling Fluid Flow Problems"
        },
        {
          "module_id": 2,
          "module_name": "Numerical Solution Schemes"
        },
        {
          "module_id": 3,
          "module_name": "Finite Difference Method"
        },
        {
          "module_id": 4,
          "module_name": "Finite Volume Method"
        }
      ],
      "subject_name": "COMPUTATIONAL HYDRAULICS"
    },
    {
      "id": 25,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Storage Structures"
        },
        {
          "module_id": 1,
          "module_name": "Selection of Dam Site"
        },
        {
          "module_id": 2,
          "module_name": "Gravity Dam"
        },
        {
          "module_id": 3,
          "module_name": "Embankment Dams"
        },
        {
          "module_id": 4,
          "module_name": "Diversion headworks"
        },
        {
          "module_id": 5,
          "module_name": "Spillways and Energy Dissipation Structures"
        }
      ],
      "subject_name": "HYDRAULIC STRUCTURES"
    },
    {
      "id": 26,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction, Basic Concepts and Definitions Disaster"
        },
        {
          "module_id": 1,
          "module_name": "Disasters and their Classification"
        },
        {
          "module_id": 2,
          "module_name": "Disaster Impacts"
        },
        {
          "module_id": 3,
          "module_name": "Disaster Risk Reduction (DRR)"
        },
        {
          "module_id": 4,
          "module_name": "Disasters, Environment and Development"
        }
      ],
      "subject_name": "DISASTER PREPAREDNESS AND PLANNING"
    },
    {
      "id": 27,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Organizational Behaviour"
        },
        {
          "module_id": 1,
          "module_name": "Personality and Attitudes"
        },
        {
          "module_id": 2,
          "module_name": "Perception"
        },
        {
          "module_id": 3,
          "module_name": "Motivation"
        },
        {
          "module_id": 4,
          "module_name": "Group Behaviour"
        },
        {
          "module_id": 5,
          "module_name": "Communication"
        },
        {
          "module_id": 6,
          "module_name": "Leadership"
        },
        {
          "module_id": 7,
          "module_name": "Organizational Politics"
        },
        {
          "module_id": 8,
          "module_name": "Conflict Management"
        },
        {
          "module_id": 9,
          "module_name": "Organizational Design"
        }
      ],
      "subject_name": "HUMAN RESOURCE DEVELOPMENT AND ORGANIZATIONAL BEHAVIOUR"
    },
    {
      "id": 28,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Self-Growth"
        },
        {
          "module_id": 1,
          "module_name": "Stepping Up"
        },
        {
          "module_id": 2,
          "module_name": "Professional Communication"
        },
        {
          "module_id": 3,
          "module_name": "Leadership & Team Playing"
        }
      ],
      "subject_name": "SOFT SKILL AND PERSONALITY DEVELOPMENT"
    },
    {
      "id": 29,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction"
        },
        {
          "module_id": 1,
          "module_name": "Precipitation Analysis"
        },
        {
          "module_id": 2,
          "module_name": "Calculation Methods and Mathematical Tools"
        },
        {
          "module_id": 3,
          "module_name": "Approaches to urban drainage"
        },
        {
          "module_id": 4,
          "module_name": "Elements of drainage systems"
        },
        {
          "module_id": 5,
          "module_name": "Analysis and Management"
        },
        {
          "module_id": 6,
          "module_name": "Master drainage plans"
        }
      ],
      "subject_name": "URBAN HYDROLOGY AND HYDRAULICS"
    },
    {
      "id": 30,
      "modules": [
        {
          "module_id": 0,
          "module_name": "Introduction Definition, Objective with legal aspect of Environmental Impact Assessment (EIA)"
        },
        {
          "module_id": 1,
          "module_name": "Methodology for EIA with Base Line Studies, Screening , Scoping and Public Consultation"
        },
        {
          "module_id": 2,
          "module_name": "EIA Analysis Data Collection & Environmental Impact Analysis"
        },
        {
          "module_id": 3,
          "module_name": "EIA Mitigation and Audit"
        },
        {
          "module_id": 4,
          "module_name": "Introduction to Life Cycle Analysis (LCA)"
        },
        {
          "module_id": 5,
          "module_name": "Life Cycle Interpretation and Inventory"
        },
        {
          "module_id": 6,
          "module_name": "LCA Impact Assessment and Practice"
        }
      ],
      "subject_name": "ENVIRONMENTAL IMPACT ASSESSMENT AND LIFE CYCLE ANALYSES"
    }
  ]
}`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
