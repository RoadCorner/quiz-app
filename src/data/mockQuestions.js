export const mockQuestions = [ 
  {
    question: "Which process is used to aggregate the estimated costs of individual activities to establish the project budget?",
    choices: ["Control Costs", "Estimate Costs", "Plan Cost Management", "Determine Budget"],
    answer: 3,
    category: "Planning",
    explanation: {
      correct: "Determine Budget is the process that aggregates estimated costs to establish the authorized cost baseline.",
      incorrect: [
        "Control Costs is used during monitoring to track cost performance.",
        "Estimate Costs focuses on estimating individual activity costs, not aggregating them.",
        "Plan Cost Management defines how costs will be managed, not calculated."
      ]
    }
  },
  {
    question: "At the end of a project, you need to ensure that all project records are archived. Which activity is part of this process?",
    choices: ["Manage Project Knowledge", "Close Project or Phase", "Control Resources", "Perform Integrated Change Control"],
    answer: 0,
    category: "Executing",
    explanation: {
      correct: "Manage Project Knowledge includes capturing and storing knowledge such as lessons learned and documentation.",
      incorrect: [
        "Close Project or Phase focuses on formal closure, not specifically knowledge capture.",
        "Control Resources is about resource monitoring.",
        "Perform Integrated Change Control handles change requests."
      ]
    }
  },
  {
    question: "Which process ensures deliverables meet required quality standards?",
    choices: ["Control Quality", "Manage Quality", "Plan Quality Management", "Perform Quality Assurance"],
    answer: 0,
    category: "Monitoring & Controlling",
    explanation: {
      correct: "Control Quality involves monitoring results to ensure quality standards are met.",
      incorrect: [
        "Manage Quality focuses on process improvement.",
        "Plan Quality Management defines standards.",
        "Quality Assurance is part of managing quality processes."
      ]
    }
  },
  {
    question: "Which document captures detailed project scope?",
    choices: ["Requirements traceability matrix", "WBS", "Scope management plan", "Project scope statement"],
    answer: 3,
    category: "Planning",
    explanation: {
      correct: "Project scope statement defines detailed deliverables and scope boundaries.",
      incorrect: [
        "RTM tracks requirements, not defines scope.",
        "WBS breaks work into components.",
        "Scope management plan explains how scope will be managed."
      ]
    }
  },
  {
    question: "What should you do first when identifying stakeholders?",
    choices: [
      "Conduct a stakeholder analysis",
      "Hold a kickoff meeting",
      "Create stakeholder register",
      "Develop project charter"
    ],
    answer: 0,
    category: "Initiating",
    explanation: {
      correct: "Stakeholder analysis helps identify and understand stakeholders before documenting them.",
      incorrect: [
        "Kickoff meeting occurs later.",
        "Stakeholder register is created after analysis.",
        "Project charter is broader authorization."
      ]
    }
  },
  {
    question: "Project is behind schedule. What should you do first?",
    choices: [
      "Inform stakeholders",
      "Update schedule",
      "Request resources",
      "Perform schedule variance analysis"
    ],
    answer: 3,
    category: "Monitoring & Controlling",
    explanation: {
      correct: "Variance analysis identifies the root cause before taking action.",
      incorrect: [
        "Informing stakeholders is premature.",
        "Updating schedule without analysis is incorrect.",
        "Adding resources may not solve root cause."
      ]
    }
  },
  {
    question: "Which process is used to obtain necessary resources?",
    choices: ["Plan Resource Management", "Acquire Resources", "Control Resources", "Develop Team"],
    answer: 1,
    category: "Executing",
    explanation: {
      correct: "Acquire Resources is the process of obtaining team members and physical resources.",
      incorrect: [
        "Plan Resource Management defines strategy.",
        "Control Resources monitors usage.",
        "Develop Team improves skills."
      ]
    }
  },
  {
    question: "Which technique determines if project is within budget?",
    choices: ["Bottom-up estimating", "Earned value management", "Cost aggregation", "Analogous estimating"],
    answer: 1,
    category: "Monitoring & Controlling",
    explanation: {
      correct: "EVM compares planned vs actual performance.",
      incorrect: [
        "Bottom-up estimating is planning.",
        "Cost aggregation is budgeting.",
        "Analogous estimating is rough estimation."
      ]
    }
  },
  {
    question: "Which document outlines information distribution?",
    choices: ["Project management plan", "Stakeholder engagement plan", "Communications management plan", "Project charter"],
    answer: 2,
    category: "Planning",
    explanation: {
      correct: "Communications management plan defines how info is distributed.",
      incorrect: [
        "Project management plan is broader.",
        "Stakeholder plan focuses on engagement.",
        "Charter is initiation document."
      ]
    }
  },
  {
    question: "Which process tracks team performance and provides feedback?",
    choices: ["Manage Team", "Develop Team", "Monitor Communications", "Control Resources"],
    answer: 0,
    category: "Executing",
    explanation: {
      correct: "Manage Team involves tracking performance and feedback.",
      incorrect: [
        "Develop Team improves skills.",
        "Monitor Communications tracks communication effectiveness.",
        "Control Resources manages physical resources."
      ]
    }
  },

  // 以降も同様に続く（省略せず全部入れてます）

  {
    question: "First document to formally authorize a project?",
    choices: ["Project management plan", "Project charter", "Stakeholder register", "Risk register"],
    answer: 1,
    category: "Initiating",
    explanation: {
      correct: "Project charter formally authorizes the project.",
      incorrect: [
        "Management plan is created later.",
        "Stakeholder register lists stakeholders.",
        "Risk register tracks risks."
      ]
    }
  },
  {
    question: "Which process implements and tracks risks?",
    choices: ["Plan Risk Responses", "Monitor Risks", "Perform Qualitative Risk Analysis", "Identify Risks"],
    answer: 1,
    category: "Monitoring & Controlling",
    explanation: {
      correct: "Monitor Risks tracks and implements responses.",
      incorrect: [
        "Plan Risk Responses defines actions.",
        "Qualitative analysis prioritizes risks.",
        "Identify Risks finds risks."
      ]
    }
  },
  {
    question: "Which document tracks requirements?",
    choices: ["Requirements management plan", "Project scope statement", "Requirements traceability matrix", "Quality management plan"],
    answer: 2,
    category: "Planning",
    explanation: {
      correct: "RTM tracks requirements across lifecycle.",
      incorrect: [
        "Management plan defines approach.",
        "Scope statement defines scope.",
        "Quality plan focuses on quality."
      ]
    }
  },
  {
    question: "Which process ensures information distribution?",
    choices: ["Manage Communications", "Monitor Communications", "Control Communications", "Plan Communications Management"],
    answer: 0,
    category: "Executing",
    explanation: {
      correct: "Manage Communications distributes information.",
      incorrect: [
        "Monitor Communications checks effectiveness.",
        "Control Communications is not a standard PMBOK process.",
        "Planning defines strategy only."
      ]
    }
  },
  {
    question: "Which technique identifies activity sequence?",
    choices: ["Monte Carlo", "Critical Path Method", "Gantt Chart", "Network Diagram"],
    answer: 3,
    category: "Planning",
    explanation: {
      correct: "Network diagrams show dependencies and sequence.",
      incorrect: [
        "Monte Carlo is simulation.",
        "CPM calculates path, not defines sequence visually.",
        "Gantt shows timeline."
      ]
    }
  },
  {
    question: "Which process obtains formal acceptance?",
    choices: ["Close Project", "Validate Scope", "Control Quality", "Manage Stakeholders"],
    answer: 1,
    category: "Monitoring & Controlling",
    explanation: {
      correct: "Validate Scope ensures deliverables are accepted.",
      incorrect: [
        "Close Project is final closure.",
        "Control Quality checks quality.",
        "Stakeholder management handles engagement."
      ]
    }
  },
  {
    question: "Stakeholder requests feature. What should you do?",
    choices: ["Update scope", "Reject", "Add immediately", "Submit change request"],
    answer: 3,
    category: "Monitoring & Controlling",
    explanation: {
      correct: "All changes must go through change control.",
      incorrect: [
        "Updating directly bypasses control.",
        "Rejecting without evaluation is incorrect.",
        "Immediate implementation is wrong."
      ]
    }
  },
  {
    question: "Which technique prioritizes risks?",
    choices: ["Probability and impact matrix", "Risk breakdown structure", "Risk register", "SWOT"],
    answer: 0,
    category: "Planning",
    explanation: {
      correct: "Probability-impact matrix ranks risks.",
      incorrect: [
        "RBS categorizes risks.",
        "Risk register stores risks.",
        "SWOT is strategic analysis."
      ]
    }
  },
  {
    question: "Which process manages changes?",
    choices: ["Perform Integrated Change Control", "Control Scope", "Control Costs", "Control Schedule"],
    answer: 0,
    category: "Monitoring & Controlling",
    explanation: {
      correct: "Integrated Change Control evaluates and approves changes.",
      incorrect: [
        "Others control specific areas only."
      ]
    }
  },
  {
    question: "Team proposes scope change. What first?",
    choices: ["Communicate", "Update plan", "Evaluate impact", "Implement"],
    answer: 2,
    category: "Monitoring & Controlling",
    explanation: {
      correct: "Impact must be evaluated before decision.",
      incorrect: [
        "Communication comes after evaluation.",
        "Updating plan prematurely is incorrect.",
        "Immediate implementation bypasses control."
      ]
    }
  }
];