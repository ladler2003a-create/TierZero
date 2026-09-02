const STORAGE_KEY = "cbrt-vrc-tier0-screening-app-v1";

const iconPaths = {
  gauge: "M12 14l4-4M4 14a8 8 0 1116 0M6 18h12",
  clipboard: "M9 4h6M9 4a2 2 0 00-2 2v1h10V6a2 2 0 00-2-2M6 7h12v13H6z",
  route: "M6 4a2 2 0 100 4 2 2 0 000-4zM18 16a2 2 0 100 4 2 2 0 000-4zM8 6h5a3 3 0 010 6h-2a3 3 0 000 6h5",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  database: "M4 6c0-2 16-2 16 0v12c0 2-16 2-16 0zM4 6v4c0 2 16 2 16 0V6M4 10v4c0 2 16 2 16 0v-4",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  upload: "M12 16V4M7 9l5-5 5 5M5 20h14",
  download: "M12 4v12M7 11l5 5 5-5M5 20h14",
  file: "M7 3h7l4 4v14H7zM14 3v5h5M9 13h6M9 17h6",
  book: "M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM4 5v16M8 7h7M8 11h7",
  reset: "M3 12a9 9 0 119 9M3 12h6M3 12l4-4"
};

const questions = [
  {
    id: "I01",
    section: "Project basics",
    question: "Project name and short description",
    responseType: "Text",
    input: "text",
    requiredCbrt: "Yes",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.02,
    example: "e.g., river wall upgrade, stormwater pumps, early warning system"
  },
  {
    id: "I02",
    section: "Project basics",
    question: "What is the project mainly doing?",
    responseType: "Dropdown/text",
    input: "select",
    options: ["Directly reduces risk", "Improves an existing asset or service", "Helps another risk-reduction project", "Other supporting action"],
    scoreMap: {
      "Directly reduces risk": 4,
      "Improves an existing asset or service": 4,
      "Helps another risk-reduction project": 3,
      "Other supporting action": 3,
      "Direct risk-reduction project": 4,
      "Existing activity improved for resilience": 4,
      "Support activity": 3,
      "Support measure": 3,
      "Adapting measure": 4,
      "Adapted activity": 4,
      "Enabling activity": 3,
      "Enabling measure": 3
    },
    requiredCbrt: "Yes",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.03
  },
  {
    id: "I03",
    section: "Where it applies",
    question: "Can we clearly show where the project starts and ends?",
    responseType: "Dropdown",
    input: "select",
    options: ["Yes", "Partly", "No"],
    scoreMap: { Yes: 5, Partly: 3, Partial: 3, No: 0 },
    requiredCbrt: "Partial",
    requiredVrc: "Yes",
    hardStop: true,
    weight: 0.05,
    note: "Must fix if the project area or service cannot be described."
  },
  {
    id: "I04",
    section: "Climate risk",
    question: "Which climate risk does the project address?",
    responseType: "Dropdown/text",
    input: "select",
    options: ["Flooding", "Coastal storm surge", "Extreme heat", "Drought", "Wildfire", "Landslide", "Water shortage"],
    scoreMap: { Flooding: 4, "Coastal storm surge": 4, "Extreme heat": 4, Drought: 4, Wildfire: 4, Landslide: 4, "Water shortage": 4, Flood: 4, "Storm surge": 4, Heat: 4, "Water stress": 4 },
    requiredCbrt: "Yes",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.04
  },
  {
    id: "I05",
    section: "Climate link",
    question: "Do we have a source showing climate change is linked to this risk?",
    responseType: "Dropdown",
    input: "select",
    options: ["Strong source", "Some source", "Only a short explanation", "No"],
    scoreMap: { "Strong source": 5, "Some source": 4, "Only a short explanation": 2, "Strong data evidence": 5, "Some data evidence": 4, "Narrative evidence only": 2, "Strong quantitative": 5, Moderate: 4, "Qualitative only": 2, No: 0 },
    requiredCbrt: "Yes",
    requiredVrc: "Yes",
    hardStop: true,
    weight: 0.08,
    note: "Must fix if there is no credible climate-change link."
  },
  {
    id: "I06",
    section: "How harm happens",
    question: "Can we explain how the risk causes harm?",
    responseType: "Dropdown",
    input: "select",
    options: ["Yes, clearly", "Partly", "Weakly", "No"],
    scoreMap: { "Yes, clearly": 5, Partly: 3, Weakly: 1, Clear: 5, Partial: 3, Weak: 1, No: 0 },
    requiredCbrt: "Yes",
    requiredVrc: "Yes",
    hardStop: true,
    weight: 0.08
  },
  {
    id: "I07",
    section: "Who or what is at risk",
    question: "Who or what is exposed, and roughly how much is exposed?",
    responseType: "Numeric/text",
    input: "text",
    requiredCbrt: "Maybe",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.05,
    example: "e.g., people, homes, roads, schools, clinics, power assets"
  },
  {
    id: "I08",
    section: "Losses without the project",
    question: "Do we know what the losses could be without the project?",
    responseType: "Dropdown",
    input: "select",
    options: ["Money estimate", "Damage or service estimate", "Only a short explanation", "No estimate"],
    scoreMap: { "Money estimate": 5, "Damage or service estimate": 4, "Only a short explanation": 2, "No estimate": 0, "Physical damage or service data": 4, "Narrative estimate only": 2, Monetary: 5, Physical: 4, Qualitative: 2, None: 0 },
    requiredCbrt: "No",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.09
  },
  {
    id: "I09",
    section: "What the project changes",
    question: "Can we estimate how much the project reduces harm?",
    responseType: "Dropdown",
    input: "select",
    options: ["Yes, from project data", "Yes, using similar examples", "Only expert judgement", "No"],
    scoreMap: { "Yes, from project data": 5, "Yes, using similar examples": 3, "Only expert judgement": 2, "Measured directly": 5, "Estimated using similar data": 3, "Expert estimate": 2, "Directly quantified": 5, Proxy: 3, "Expert judgement": 2, No: 0 },
    requiredCbrt: "Yes",
    requiredVrc: "Yes",
    hardStop: true,
    weight: 0.1
  },
  {
    id: "I10",
    section: "Money value",
    question: "Can we put a money value on the harm avoided?",
    responseType: "Dropdown",
    input: "select",
    options: ["Yes, using prices or costs", "Yes, approximately", "Needs a study", "No"],
    scoreMap: { "Yes, using prices or costs": 5, "Yes, approximately": 4, "Needs a study": 2, "Market prices available": 5, "Approximate values available": 4, "Needs a valuation study": 2, "Direct market values": 5, "Proxy values": 4, "Needs study": 2, No: 0 },
    requiredCbrt: "No",
    requiredVrc: "Yes",
    hardStop: true,
    weight: 0.1
  },
  {
    id: "I11",
    section: "Harm avoided",
    question: "Rough value of harm avoided",
    responseType: "Numeric",
    input: "number",
    requiredCbrt: "No",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.07,
    example: "Include currency and whether this is annual, lifetime, or another period"
  },
  {
    id: "I12",
    section: "Income information",
    question: "Income information for the affected people or place",
    responseType: "Numeric/source",
    input: "text",
    requiredCbrt: "No",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.04,
    example: "Community, regional, or national income estimate"
  },
  {
    id: "I13",
    section: "Already required?",
    question: "Is the project doing more than what is already required or funded?",
    responseType: "Dropdown",
    input: "select",
    options: ["Yes", "Partly", "No", "Unknown"],
    scoreMap: { Yes: 5, Partly: 3, Unknown: 2, No: 0 },
    requiredCbrt: "No",
    requiredVrc: "Yes",
    hardStop: true,
    weight: 0.08,
    note: "Must fix if the project adds nothing beyond existing requirements or funding."
  },
  {
    id: "I14",
    section: "Funding role",
    question: "Does the funding make the project better, bigger, or faster?",
    responseType: "Dropdown",
    input: "select",
    options: ["Yes, clearly", "Somewhat", "No", "Unknown"],
    scoreMap: { "Yes, clearly": 5, "Yes strong": 5, Somewhat: 3, Unknown: 1, No: 0 },
    requiredCbrt: "Yes",
    requiredVrc: "Helpful",
    hardStop: false,
    weight: 0.04
  },
  {
    id: "I15",
    section: "Checking results",
    question: "Is there a plan to check whether the project works?",
    responseType: "Dropdown",
    input: "select",
    options: ["Yes, clear plan", "Some plan", "Very limited plan", "No plan"],
    scoreMap: { "Yes, clear plan": 5, "Some plan": 4, "Very limited plan": 2, "No plan": 0, All: 5, Some: 4, Minimal: 2, None: 0 },
    requiredCbrt: "Yes",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.08
  },
  {
    id: "I16",
    section: "Outside check",
    question: "Could someone outside the project check the results?",
    responseType: "Dropdown",
    input: "select",
    options: ["Yes", "Probably", "Difficult", "No"],
    scoreMap: { Yes: 5, Probably: 4, Difficult: 2, No: 0 },
    requiredCbrt: "No",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.05
  },
  {
    id: "I17",
    section: "Risk moved elsewhere",
    question: "Could the project move risk onto someone else?",
    responseType: "Dropdown",
    input: "select",
    options: ["No", "Low", "Medium", "High"],
    scoreMap: { No: 5, Low: 4, Medium: 2, High: 0 },
    requiredCbrt: "Yes",
    requiredVrc: "Yes",
    hardStop: true,
    weight: 0.08,
    note: "Must fix if high risk remains unresolved."
  },
  {
    id: "I18",
    section: "Serious failure risk",
    question: "Could the design or failure of the project create severe harm?",
    responseType: "Dropdown",
    input: "select",
    options: ["No", "Low", "Medium", "High"],
    scoreMap: { No: 5, Low: 4, Medium: 1, High: 0 },
    requiredCbrt: "Maybe",
    requiredVrc: "Yes",
    hardStop: true,
    weight: 0.06,
    note: "Must fix if serious failure risk remains unresolved."
  },
  {
    id: "I19",
    section: "Affected people",
    question: "Have affected people been identified and consulted?",
    responseType: "Dropdown",
    input: "select",
    options: ["Done", "Planned", "Very limited", "No"],
    scoreMap: { Done: 5, Planned: 3, "Very limited": 2, No: 0, Completed: 5, Minimal: 2, None: 0 },
    requiredCbrt: "Yes",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.05
  },
  {
    id: "I20",
    section: "Who can claim",
    question: "Who owns the project information and the right to claim the benefit?",
    responseType: "Text",
    input: "text",
    requiredCbrt: "Maybe",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.04,
    example: "Government agency, utility, project company, community, funder"
  },
  {
    id: "I21",
    section: "Other claims",
    question: "Is anyone else already claiming this same benefit?",
    responseType: "Dropdown",
    input: "select",
    options: ["No", "Yes, but manageable", "Unknown", "Yes, conflicting"],
    scoreMap: { No: 5, "Yes, but manageable": 4, Unknown: 2, "Yes, conflicting": 0, "Disclosed manageable": 4, "Yes conflicting": 0 },
    requiredCbrt: "Maybe",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.04
  },
  {
    id: "I22",
    section: "Worth more review",
    question: "Is the possible benefit large enough to make deeper review worthwhile?",
    responseType: "Dropdown",
    input: "select",
    options: ["Strong", "Possible", "Weak", "No"],
    scoreMap: { Strong: 5, Possible: 3, Weak: 1, No: 0 },
    requiredCbrt: "No",
    requiredVrc: "Yes",
    hardStop: false,
    weight: 0.05
  }
];

const extraQuestions = [
  ["Losses without the project", "Project papers may explain the project, but not what would happen if it was not built.", "The review needs a before-project loss estimate.", "At least one loss estimate, with a source and the main assumptions.", "Expected yearly damage, disruption, income loss, or repair cost.", "Number + source"],
  ["Losses after the project", "Project papers may say risk will fall, but not how much risk remains.", "The review needs a rough before-and-after comparison.", "A reasonable estimate of remaining loss after the project.", "Expected reduction in damage, downtime, people affected, or repair cost.", "Number or percent"],
  ["Climate-change link", "The project may address bad weather without showing the climate-change link.", "A VRC is for climate-related vulnerability reduction.", "A source showing climate change affects the risk or damage level.", "Study, local data, government source, or clear expert explanation.", "Source + note"],
  ["Money value", "Benefits are often described as people helped or assets protected.", "A later review needs a money value for avoided harm.", "A practical way to price each main benefit.", "Repair cost, asset value, lost income, downtime cost, or service value.", "Number + note"],
  ["Income information", "Project papers often do not include income data.", "Income context may affect later VRC calculations.", "A clear income source and year.", "Community, regional, or national income per person.", "Number + source"],
  ["Already required or funded", "Public projects may already be required by law, permits, or budgets.", "The review needs to know what is new or additional.", "A short statement of what is required, what is funded, and what is extra.", "Requirement, funding status, added scope, faster timing, or better quality.", "Text"],
  ["Checking results", "Reports may show spending, not whether risk actually fell.", "The benefit needs to be checked after the project is done.", "A simple plan naming what will be measured, by whom, and how often.", "Inspections, service levels, outages, flooding depth, people reached.", "Text + dates"],
  ["Risk moved elsewhere", "A project can protect one place while making another place worse off.", "The review needs confidence that others are not harmed.", "A check of nearby, upstream, downstream, or displaced risks.", "Who could be affected and how the risk will be managed.", "Text"],
  ["Serious failure risk", "Some projects can cause major harm if they fail.", "The review needs to know serious failure risks are understood.", "A short failure-risk check and response plan.", "Who could be harmed, warning systems, backup plans, emergency response.", "Text"],
  ["Affected people", "Consultation may be mentioned without saying who was affected or what they said.", "The review needs to know affected people can be heard.", "Affected groups identified and consultation status explained.", "Meetings, objections, complaints process, unresolved concerns.", "Text"],
  ["Who can claim the benefit", "Funding a project does not automatically mean owning the VRC benefit claim.", "The review needs one clear owner and no conflicting claims.", "Claim owner and any other claims listed.", "Entity names, funders, data owner, other programs claiming the benefit.", "Text"]
];

const missingCategories = [
  {
    title: "Climate risk and project boundary",
    summary: "The project needs a clear climate-risk case and a clear description of what is inside the project.",
    rationale: "These are bunched because they define the claim: what risk is being reduced, where, and through what harm pathway.",
    items: [
      ["Climate-change link", "Source showing climate change affects the risk or damage level.", "Study, local data, government source, or clear expert explanation."],
      ["Project boundary", "Map, service area, asset list, coordinates, or covered user group.", "Enough detail for someone else to check what is included and excluded."],
      ["How harm happens", "A short pathway from climate event to exposed people, assets, services, or income.", "Risk, exposed group or asset, and likely harm in plain language."]
    ]
  },
  {
    title: "Losses, value, and scale",
    summary: "The later VRC case needs a rough before-and-after view of avoided harm and its practical value.",
    rationale: "These are bunched because they usually come from the same technical or financial evidence base: loss estimates, valuation data, and scale assumptions.",
    items: [
      ["Losses without the project", "Expected damage, disruption, income loss, or repair cost if the project is not built.", "Number plus source or assumption."],
      ["Losses after the project", "Expected remaining damage or service disruption after the project.", "Number, percentage reduction, model output, or reasoned estimate."],
      ["Money value and income context", "Pricing route for avoided harm plus income data for the affected place or people.", "Repair cost, asset value, downtime cost, lost income, and income source/year."]
    ]
  },
  {
    title: "Additionality and right to claim",
    summary: "The project should add something beyond what would happen anyway, and the benefit claim should be clear.",
    rationale: "These are bunched because they are governance questions: what is extra, who enabled it, and who can claim the resulting benefit.",
    items: [
      ["Already required or funded", "What is legally required, already budgeted, or already committed.", "Show what is new, faster, bigger, or better because of this project."],
      ["Funding role", "How funding changes delivery, scope, timing, quality, monitoring, or maintenance.", "Funding paper, budget note, implementation plan, or decision record."],
      ["Claim owner and other claims", "Who can claim the benefit and whether anyone else is claiming the same benefit.", "Ownership documents, funding terms, programme claims, or credit registry information."]
    ]
  },
  {
    title: "Monitoring, safeguards, and affected people",
    summary: "A first-pass case is stronger when the project can be checked and when risks to others are understood.",
    rationale: "These are bunched because they affect confidence after delivery: checking results, avoiding harm to others, and showing affected people have been considered.",
    items: [
      ["Checking results", "What will be measured, who records it, how often, and where records are kept.", "Monitoring plan, KPIs, inspections, service data, or operation records."],
      ["Risk moved elsewhere or severe failure", "Whether the project could make another place worse off or create serious harm if it fails.", "Downstream checks, failure-mode review, backup plan, warning system, or emergency response."],
      ["Affected people", "Who is affected and whether they have been consulted or can raise concerns.", "Stakeholder list, meeting notes, grievance log, public notice, or consultation plan."]
    ]
  }
];

const crosswalk = [
  ["Project basics", "Project name, location, owner, and short description.", "Clear project area or service covered.", "Ask where the project starts and ends."],
  ["Climate risk", "Flood, heat, drought, wildfire, or another climate risk.", "A source linking the risk to climate change.", "Ask for a study, local data, or credible explanation."],
  ["Who is at risk", "People, homes, services, assets, or infrastructure affected.", "Rough counts or values.", "Ask how many people or assets are exposed."],
  ["Losses without the project", "Expected harm if nothing changes.", "A rough loss estimate.", "Ask for past losses, modelled losses, or a reasoned estimate."],
  ["What the project changes", "How the project lowers harm.", "A before-and-after estimate.", "Ask how damage, downtime, or people affected will change."],
  ["Money value", "Costs or values that can price the avoided harm.", "A practical way to convert benefits into money terms.", "Ask for repair costs, asset values, lost income, or downtime costs."],
  ["Already required?", "Whether the project is already required or funded.", "What is new, faster, bigger, or better because of this project.", "Ask what would happen without the proposed funding."],
  ["Checking results", "What will be measured after the project is done.", "A plan that someone outside the project can understand.", "Ask who keeps the data and how often it is checked."],
  ["Avoiding harm", "Whether the project creates risks for others.", "A clear answer on shifted risk and serious failure risk.", "Ask who could be worse off and how that risk is managed."],
  ["Affected people", "Who is affected and how they were consulted.", "Any concerns, objections, or complaints process.", "Ask for consultation notes or a plan to consult."],
  ["Who can claim", "Who owns the benefit claim.", "Any other programs or funders claiming the same benefit.", "Ask for claim owner and other claims."],
  ["Worth more review", "Rough size of the possible benefit.", "Whether deeper review is worth the effort.", "Ask for a rough value or scale estimate."]
];

const dataModel = [
  ["Project", "Project ID", "Text", "Yes", "TOKYO-FLOOD-001", "Unique project reference"],
  ["Project", "Project name", "Text", "Yes", "River basin flood defence upgrade", ""],
  ["Project", "Location", "Text", "Yes", "Japan / Tokyo", ""],
  ["Project", "Currency", "Text", "Helpful", "JPY or EUR", "Use the same currency where possible"],
  ["Project", "Project cost", "Number", "Helpful", "1500000000", "Useful for judging project scale"],
  ["Climate risk", "Risk type", "Choice", "Yes", "Flooding", ""],
  ["Climate link", "Strength of climate-change source", "0 to 5", "Yes", "4", "Feeds the result"],
  ["Where it applies", "Clear project area or service", "Yes/No", "Yes", "Partly", "Must fix if no area or service can be described"],
  ["Who is at risk", "People exposed", "Number", "If relevant", "50000", ""],
  ["Who is at risk", "Assets exposed", "Number", "If relevant", "25000000000", ""],
  ["Losses", "Loss without project", "Number", "Yes for later estimate", "1200000000", "Expected yearly loss if nothing changes"],
  ["Losses", "Loss after project", "Number", "Yes for later estimate", "450000000", "Expected yearly loss after the project"],
  ["Losses", "Harm avoided", "Calculated", "Helpful", "loss without project minus loss after project", "Should be more than zero"],
  ["Income", "Income context", "Number", "Yes", "1.0", "Used later if income context affects the VRC estimate"],
  ["Avoiding harm", "Risk moved elsewhere", "Choice", "Yes", "Low", "Must fix if high and unresolved"],
  ["Avoiding harm", "Serious failure risk", "Choice", "Yes", "Low", "Must fix if medium or high and unresolved"],
  ["Checking results", "How often results are checked", "Choice", "Yes", "Annual or quarterly", ""],
  ["Checking results", "Can results be checked outside the project?", "Yes/No", "Yes", "Probably", ""],
  ["Already required?", "Required, funded, or extra?", "Choice", "Yes", "Extra, unclear, or already required", "Must fix if already required with nothing extra"],
  ["Who can claim", "Benefit claim owner", "Text", "Yes", "Tokyo Metropolitan Government", ""],
  ["Who can claim", "Other claims disclosed", "Yes/No", "Yes", "Yes", ""]
];

const glossaryTerms = [
  {
    slug: "vrc",
    term: "VRC / Vulnerability Reduction Credit",
    aliases: ["VRC", "VRCs", "Vulnerability Reduction Credit", "Vulnerability Reduction Credits", "Vulnerability Reduction Certificate", "credit estimate"],
    definition: "A VRC is a unit or certificate connected to avoided climate-related impact costs. In plain terms, it is the claim that a project measurably reduces vulnerability to climate risk. In this app, VRC means Vulnerability Reduction Credit, not resilience credit."
  },
  {
    slug: "tier-0",
    term: "Tier 0",
    aliases: ["Tier 0", "first-pass", "first-pass check", "early check", "VRC Prospect", "screening"],
    definition: "The first screening step for a possible VRC project. It is closest to a VRC Prospect check: it asks whether the project has credible potential and enough basic information to justify deeper review. It does not validate, verify, register, or issue VRCs."
  },
  {
    slug: "adaptation-project",
    term: "Adaptation project",
    aliases: ["adaptation project", "Adaptation projects", "climate-risk project", "Adaptation Measures", "adaptation measures", "project activities"],
    definition: "A project or set of measures that helps reduce vulnerability to climate risks or make better use of climate-related opportunities. For this screener, the important point is whether the activity reduces likely harm to people, assets, services, income, or ecosystems."
  },
  {
    slug: "project-proponent",
    term: "Project proponent",
    aliases: ["project proponent", "Project Proponent", "project developer", "applicant", "project owner"],
    definition: "The organisation or person putting the project forward. The proponent is normally responsible for the project document, evidence, monitoring arrangements, and showing who has the right to claim any VRC benefit."
  },
  {
    slug: "climate-risk",
    term: "Climate risk",
    aliases: ["climate risk", "climate-risk", "climate-related risk", "risk type", "climate vectors", "climate hazard"],
    definition: "The climate-related hazard or pressure the project addresses, plus the harm it could cause. Examples include flooding damaging homes, heat affecting health, or drought disrupting water supply. Framework language may refer to climate variables or climate vectors such as temperature, rainfall, humidity, or wind."
  },
  {
    slug: "climate-change-link",
    term: "Climate-change link",
    aliases: ["climate-change link", "climate change is linked", "climate-related", "climate attribution"],
    definition: "Evidence that the risk is connected to climate change, not only ordinary weather, ageing infrastructure, poor maintenance, or general development need."
  },
  {
    slug: "boundary",
    term: "Project boundary",
    aliases: ["where the project starts and ends", "boundary", "project boundary", "Project Boundary", "project area", "service area", "operating zone", "physical boundary", "geographical boundary"],
    definition: "The limits of the climate-vulnerable activities, assets, people, or services that are reasonably attributable to the VRC project. At Tier 0, this means the applicant should be able to show the area, assets, services, or users covered, usually with a map, coordinates, service description, or asset list."
  },
  {
    slug: "source",
    term: "Source",
    aliases: ["source", "sources", "document name", "page reference", "official datasets", "credible technical studies"],
    definition: "The document, dataset, study, map, model, record, or expert note that supports an answer. A useful source is named clearly enough for another person to find or check it."
  },
  {
    slug: "assumption",
    term: "Assumption",
    aliases: ["assumption", "assumptions", "expert judgement", "expert estimates", "expert estimate"],
    definition: "A practical estimate used when exact evidence is not yet available. Good assumptions say what was assumed, why it is reasonable, and what should be checked later."
  },
  {
    slug: "exposed",
    term: "Exposed people, assets, or services",
    aliases: ["exposed", "people exposed", "assets exposed", "service users", "affected people or place", "community", "system"],
    definition: "The people, homes, roads, services, infrastructure, ecosystems, income streams, or other assets that could be harmed if the climate risk occurs. In the framework, the community is the people in or near the project boundary who may be affected, while the system is the broader set of assets, activities, and income at risk."
  },
  {
    slug: "loss-estimate",
    term: "Loss estimate",
    aliases: ["loss estimate", "loss estimates", "losses", "loss without project", "loss after project", "expected harm", "Impact Cost", "impact cost", "impact costs"],
    definition: "A rough estimate of damage, cost, disruption, lost income, people affected, or service failure before or after the project. In VRC framework terms, these are impact costs: the climate-related losses that are expected with and without the project."
  },
  {
    slug: "baseline",
    term: "Baseline scenario / without the project",
    aliases: ["baseline", "Baseline Scenario", "baseline scenario", "without the project", "if the project is not done", "before-project", "before and after", "conditions prior to project initiation"],
    definition: "The expected situation if the project does not happen. The framework uses this as the comparison point for deciding whether the project is additional and for estimating how much climate-related loss is avoided."
  },
  {
    slug: "harm-avoided",
    term: "Avoided impact cost / harm avoided",
    aliases: ["harm avoided", "avoided harm", "avoided loss", "avoided losses", "benefit", "Avoided Impact Cost", "Avoided Impacts Cost", "AIC", "creditable avoided impact costs", "Creditable Avoided Impact Costs"],
    definition: "The climate-related loss the project is expected to prevent or reduce. In the framework this is Avoided Impact Cost: expected climate-change loss without the project minus expected climate-change loss with the project. For a strong VRC case, this should be greater than zero and based on a clear method."
  },
  {
    slug: "money-value",
    term: "Money value",
    aliases: ["money value", "monetary value", "priced", "pricing", "repair costs", "replacement values", "downtime costs", "lost income", "cost in local currency", "cost in Euros"],
    definition: "A practical way to express avoided harm in financial terms, such as avoided repair costs, avoided service downtime, protected asset value, or avoided income loss. Later VRC work may need values in a stated currency and year, with exchange-rate assumptions if values are converted."
  },
  {
    slug: "impact-cost-factor",
    term: "Impact cost factor",
    aliases: ["impact cost factor", "impact cost factors", "Applicable Impact Cost Factors", "factor cost"],
    definition: "A specific type of cost or loss used in the VRC calculation, such as repair costs, lost income, service disruption, or other measurable harm. At Tier 0, applicants should identify which main costs are relevant, even if the numbers are still rough."
  },
  {
    slug: "income-equalisation-factor",
    term: "Income Equalisation Factor (IEF)",
    aliases: ["Income Equalisation Factor", "IEF", "income information", "income context", "GNI Threshold", "per capita income"],
    definition: "A VRC framework adjustment connected to income context. At Tier 0, the user does not need to calculate the IEF, but should provide the best available income information for the affected people or place, including source, year, geography, and currency where possible."
  },
  {
    slug: "additionality",
    term: "Additionality / more than already required",
    aliases: ["already required", "already funded", "business as usual", "additional", "additionality", "Additionality", "committed works", "regulatory surplus", "positive list", "performance benchmark"],
    definition: "Whether the proposed activity is distinct from the baseline. In plain terms: would this climate-risk reduction happen anyway because of existing laws, permits, budgets, maintenance plans, or committed funding? If yes, the VRC case is weaker unless the project clearly adds something more."
  },
  {
    slug: "activity-period",
    term: "Activity period / crediting period",
    aliases: ["Activity Period", "activity period", "project crediting period", "crediting period", "Project Crediting Period", "renewal", "project start date", "Project Start Date"],
    definition: "The period when VRCs could be recorded or issued for a validated project. The framework uses project activity periods of up to ten years, with renewal and revalidation requirements. At Tier 0, note the expected project start date and the period over which benefits are estimated."
  },
  {
    slug: "permanence",
    term: "Permanence",
    aliases: ["Permanence", "permanence", "physical integrity", "maintenance", "revalidation", "re-verification"],
    definition: "The requirement that project activities or investments continue to generate the expected vulnerability reduction over the crediting lifetime. For a Tier 0 answer, this means explaining whether the asset or service can keep working through maintenance, operations, and later checks."
  },
  {
    slug: "monitoring-plan",
    term: "Monitoring plan",
    aliases: ["monitoring plan", "Monitoring Plan", "Monitoring", "monitoring", "results plan", "check results", "checking results", "records", "KPIs", "Data and Parameters", "QA/QC", "monitoring report"],
    definition: "The plan for obtaining, recording, compiling, and analysing the data used to quantify VRCs and report results. At Tier 0, it should say what is measured, who records it, how often, where records are kept, and whether quality checks such as calibration or QA/QC are needed."
  },
  {
    slug: "outside-reviewer",
    term: "Validation and verification",
    aliases: ["outside reviewer", "someone outside the project", "independent reviewer", "reviewer", "auditor", "Audit", "Validation", "validation", "Verification", "verification", "Validator", "Verifier"],
    definition: "Validation checks the project document before or during registration; verification checks monitoring reports and results later. For Tier 0, the practical question is whether an independent person could understand and check the evidence, records, calculations, photos, datasets, or inspection reports."
  },
  {
    slug: "shifted-risk",
    term: "Leakage / shifted risk",
    aliases: ["Leakage", "leakage", "move risk", "moved elsewhere", "shifted risk", "worse off", "downstream", "outside the Project Boundary", "outside the project boundary"],
    definition: "Changes in vulnerability outside the project boundary caused by the project. In plain terms, this asks whether protecting one place or group could make another place or group worse off, such as moving floodwater downstream or shifting costs to another community."
  },
  {
    slug: "serious-failure-risk",
    term: "Avoidance of catastrophic harm",
    aliases: ["serious failure risk", "severe harm", "failure risk", "failure-mode", "Avoidance of Catastrophic Harm", "catastrophic harm", "sudden loss of life"],
    definition: "The framework requirement to identify conditions where project failure could cause sudden loss of life or other severe consequences, and show that reasonable measures reduce that possibility. At Tier 0, identify the serious failure scenario and the prevention, backup, or emergency response plan."
  },
  {
    slug: "consultation",
    term: "Local stakeholder consultation",
    aliases: ["consulted", "consultation", "Local Stakeholder Consultation", "stakeholder lists", "meeting notes", "community feedback", "grievance logs", "Community acceptance", "community acceptance", "Free and Informed Consent", "Indigenous Communities Consultation"],
    definition: "The framework requirement that affected community members are made aware of the project and have a real opportunity to raise objections or other feedback. At Tier 0, useful evidence includes stakeholder lists, meeting notes, consultation plans, complaints processes, or records of community feedback."
  },
  {
    slug: "environmental-social-impacts",
    term: "Environmental and social impacts",
    aliases: ["environmental and social impacts", "Environmental and Social Impacts", "environmental impact", "social impact", "impact assessment", "negative impacts"],
    definition: "Possible environmental or social effects caused by the project itself, separate from the climate risk the project is trying to reduce. At Tier 0, flag any known assessment, expected adverse impact, mitigation plan, or reason an assessment may be needed."
  },
  {
    slug: "claim-owner",
    term: "Right of use and claim ownership",
    aliases: ["claim owner", "benefit claimant", "right to claim", "claim the benefit", "claim the vulnerability reduction benefit", "Right of Use", "right of use", "property rights", "legal title", "VRC ownership", "title to a VRC"],
    definition: "Evidence showing who controls the relevant project activity, assets, information, or rights, and who may claim the resulting VRC benefit. This may be different from the funder, asset owner, operator, or data owner, so conflicts should be disclosed early."
  },
  {
    slug: "double-counting",
    term: "Double counting",
    aliases: ["double counting", "same benefit", "other claims", "already claiming", "Other Forms of Environmental and Resource Credit", "environmental credit", "resource credit", "carbon credit", "renewable energy certificates"],
    definition: "A problem that occurs when more than one funder, programme, report, insurer, or credit scheme claims the same vulnerability reduction benefit. Applicants should disclose other environmental or resource credits, including carbon, renewable energy, water, wetland, or similar claims."
  },
  {
    slug: "deeper-review",
    term: "Deeper review",
    aliases: ["deeper review", "deeper VRC review", "next review", "formal review", "Indicative VRC Benchmark", "Certified VRC", "registration", "issuance"],
    definition: "A more detailed assessment after Tier 0. Depending on purpose, later work may support an Indicative VRC Benchmark for planning or a Certified VRC pathway involving validation, registration, monitoring, verification, and issuance."
  },
  {
    slug: "must-fix",
    term: "Must-fix item",
    aliases: ["must-fix", "must fix", "Must fix", "stop"],
    definition: "An issue important enough to block or delay deeper review until it is clarified, supported with evidence, or resolved."
  },
  {
    slug: "non-compliance",
    term: "Non-compliance",
    aliases: ["non-compliance", "Non-Compliance", "nonconformance", "non-conformance", "complaint", "dispute", "appeal"],
    definition: "A failure or possible failure to follow the project document, methodology, or VRC Standard Framework requirements. At Tier 0, this usually means noting obvious legal, operational, ownership, consultation, or monitoring problems that could later block approval."
  }
];

const glossaryAliasMap = glossaryTerms.reduce((map, item) => {
  item.aliases.forEach((alias) => {
    map.set(alias.toLowerCase(), item.slug);
  });
  return map;
}, new Map());

const questionHelp = {
  I01: "Enter the project name plus one or two sentences on what will be built or changed, where it is, and who it helps. This usually comes from the concept note, proposal, design brief, or funding application.",
  I02: "Choose the option that best describes the project's main role. Look at the workplan or budget: is it directly reducing risk, upgrading an existing service, or supporting another risk-reduction activity?",
  I03: "Describe the place, asset, service, or group covered by the project clearly enough for someone else to check it. Useful sources include maps, asset lists, service-area descriptions, permits, or design drawings.",
  I04: "Select the main climate-related risk the project is trying to reduce. Use the project proposal, hazard assessment, climate-risk screening, local disaster history, or design rationale.",
  I05: "Provide the source showing the risk is climate-related, not just ordinary wear, poor maintenance, or general development need. Good sources include national climate reports, local hazard studies, official datasets, or credible technical studies.",
  I06: "Explain the pathway from risk to harm in plain language: what climate event occurs, who or what is exposed, and what damage or disruption follows. This helps reviewers see that the project reduces a real vulnerability.",
  I07: "Enter who or what could be affected and roughly how many or how much. Look for population counts, asset registers, service-user data, infrastructure inventories, GIS layers, or project feasibility studies.",
  I08: "State what losses could happen if the project is not done. Sources can include past damage records, insurance or repair costs, outage logs, disaster assessments, risk models, or expert estimates.",
  I09: "Estimate the difference the project makes, such as fewer people affected, lower flood depth, shorter outages, or less repair cost. This may come from engineering design, modelling, feasibility work, comparable projects, or expert judgement.",
  I10: "Say whether the avoided harm can be converted into money terms. Possible sources include repair costs, replacement values, service downtime costs, avoided emergency costs, crop losses, lost income, or asset valuation data.",
  I11: "Enter the rough monetary value of harm avoided and the period it covers. If the number is approximate, note the currency, year, time period, and main assumption so it can be checked later.",
  I12: "Enter income data for the affected people or place if available. Use local survey data where possible; otherwise use municipal, regional, national, World Bank, statistics-office, or project socioeconomic data.",
  I13: "Explain what the project adds beyond what is already legally required, permitted, budgeted, or committed. Check laws, permit conditions, existing budgets, maintenance plans, donor commitments, and approved capital plans.",
  I14: "Describe how this funding changes the project: earlier delivery, larger coverage, higher design standard, better maintenance, stronger monitoring, or delivery that would not otherwise happen. Use funding papers, budget notes, or implementation plans.",
  I15: "Describe how results will be checked after delivery: what will be measured, who records it, how often, and where records are kept. Look for monitoring plans, operation manuals, KPIs, inspection schedules, or service data.",
  I16: "Say whether an outside reviewer could check the result using records, photos, monitoring data, inspection reports, or public datasets. The answer is stronger when evidence is dated, stored, and understandable without relying on verbal claims.",
  I17: "Check whether reducing risk in one place could increase risk somewhere else or for another group. Look at downstream areas, neighbouring communities, displaced users, changed drainage, access impacts, or cost burdens.",
  I18: "Identify whether project failure could create severe harm and how that risk is controlled. Sources include design safety reviews, maintenance plans, emergency plans, backup power plans, inspection regimes, and failure-mode checks.",
  I19: "State which affected groups have been identified and whether they have been consulted. Useful evidence includes stakeholder lists, meeting notes, grievance logs, public notices, consultation plans, or community feedback.",
  I20: "Name the organisation that can claim the vulnerability reduction benefit and explain its relationship to the project. Check ownership documents, funding agreements, data-sharing terms, contracts, or government authorisations.",
  I21: "Check whether the same benefit is already claimed by another funder, project, insurer, public programme, carbon or adaptation credit scheme, or impact report. This helps avoid double counting.",
  I22: "Judge whether the likely benefit is large enough to justify a deeper review. Use the rough avoided-loss estimate, number of people or assets protected, project cost, strategic importance, and availability of evidence."
};

const answerHelp = {
  I02: "Pick the option that best fits the main role of the project. If two fit, choose the one closest to the actual work being delivered.",
  I03: "Choose Yes only if the covered place, service, asset, or user group can be described clearly enough for someone else to check.",
  I05: "Choose Strong source for formal data or published studies; Some source for partial or local support; short explanation if there is no clear source yet.",
  I06: "Choose Yes, clearly only if the answer explains the risk, who or what is affected, and the harm that follows.",
  I07: "Enter plain text and rough numbers. Approximate counts are acceptable at this stage if the source or assumption is noted.",
  I08: "Choose the strongest type of estimate available. A money estimate is strongest; a short explanation is useful but weaker.",
  I09: "Choose project data if the estimate comes from the project design or model. Choose similar examples if it relies on comparable projects.",
  I10: "Choose Yes if there is a practical pricing route now. Choose Needs a study if pricing is possible but has not yet been worked through.",
  I11: "Enter a number only. Put currency, period, and assumptions in the notes box.",
  I12: "Enter the best available income figure or description. If exact local data is unavailable, use the closest reliable area.",
  I13: "Choose Yes only if the project clearly adds something beyond existing legal requirements, permits, budgets, or committed works.",
  I15: "Choose Yes, clear plan only if the plan says what will be measured, who checks it, and when.",
  I16: "Choose Yes or Probably only if records could be shared and understood by someone outside the project team.",
  I17: "Choose High if another group or place could become materially worse off and there is no clear fix yet.",
  I18: "Choose High if failure could cause severe harm and there is no clear prevention or response plan.",
  I20: "Name the organisation or person who can make the VRC benefit claim, not only who paid for the project.",
  I22: "Choose Strong if the likely benefit appears large enough to justify a detailed review; choose Possible if scale is plausible but still uncertain."
};

const notesHelp = {
  I02: "Add a one-line reason for the choice, especially if the project supports another project rather than directly reducing risk.",
  I03: "Add the boundary source: map, asset list, service area, administrative area, concession area, or description of covered users.",
  I05: "Name the source and date. For example: national climate assessment, city flood study, IPCC-linked study, or local hazard data.",
  I06: "Write the harm chain in one sentence: risk, exposed people/assets, and likely harm.",
  I07: "Add the source or assumption behind any rough count or value.",
  I08: "Note whether the estimate is annual, lifetime, historical, modelled, or based on expert judgement.",
  I09: "Explain the basis for the reduction estimate, such as design standard, model output, past project, or expert assumption.",
  I10: "State the pricing method: repair costs, asset value, downtime cost, lost income, emergency cost, or another practical basis.",
  I11: "Include currency, time period, and whether the number is annual, lifetime, or for one event.",
  I12: "Add source, year, geography, and whether the figure is community, regional, or national.",
  I13: "Explain what would happen without this funding and what this project adds.",
  I15: "List the metric, data owner, check frequency, and where records will be kept.",
  I16: "Say who could check the records and what documents or data they would inspect.",
  I17: "Describe who could be worse off, where they are, and how the risk would be reduced or managed.",
  I18: "Describe the serious failure scenario and the prevention, backup, or emergency response plan.",
  I20: "Explain the relationship between funder, asset owner, data owner, and benefit claimant if they are different.",
  I22: "Note the rough benefit size or reason the project is worth, or not worth, deeper review."
};

const formHelp = {
  response: "Choose the closest answer based on the evidence you have now. If the answer is uncertain, choose the closest option and explain the uncertainty in the notes box.",
  evidence: "Add the source, document name, date, link, page reference, or assumption behind the answer. A short note is enough at this stage if it helps another person understand where the answer came from.",
  score: "Use this only if you need to override the automatic strength rating. 0 means no useful support, 3 means workable but incomplete, and 5 means strong evidence.",
  majorBlocker: "A must-fix item can stop the project from moving to deeper review. The notes should say what evidence is missing or what issue needs to be resolved.",
  weighted: "This question affects the result, but a weak answer does not automatically stop the review. Use the notes to show what is known and what still needs checking.",
  weight: "This shows how much this question affects the result. Higher-weight questions need clearer evidence because they have more influence on the first-pass outcome."
};

const gapReasonHelp = {
  "Missing answer": "This question has no answer or note yet. Add the best available answer, even if it is provisional, and include the source or assumption in the notes.",
  "Must fix": "This weak answer affects a key check and should be resolved first. The project may need a clearer source, boundary, climate link, additionality explanation, or risk-control plan.",
  "Needs better support": "There is an answer, but it needs a better source or explanation. Add where the information came from and why it is reasonable for this project."
};

const decisionHelp = {
  "1": "Start by checking that the project is about reducing climate-related harm.",
  "2": "The review needs to know exactly what the project covers.",
  "3": "The review needs a clear link from climate risk to real harm.",
  "4": "The review compares likely harm without the project and likely harm with the project.",
  "5": "A later VRC review needs a money value for avoided harm.",
  "6": "This checks whether the possible benefit is large enough to justify more work.",
  "7": "The project should add something beyond what is already required or funded.",
  "8": "The project should not make another person, place, or service worse off.",
  "9": "Results need to be checked after the project is done.",
  "10": "The right to claim the benefit should be clear.",
  "11": "The final result combines overall strength, missing answers, and must-fix items."
};

const questionAnswerAliases = {
  I02: {
    "Direct risk-reduction project": "Directly reduces risk",
    "Existing activity improved for resilience": "Improves an existing asset or service",
    "Support activity": "Helps another risk-reduction project",
    "Support measure": "Other supporting action",
    "Adapting measure": "Directly reduces risk",
    "Adapted activity": "Improves an existing asset or service",
    "Enabling activity": "Helps another risk-reduction project",
    "Enabling measure": "Other supporting action"
  },
  I03: { Partial: "Partly" },
  I04: {
    Flood: "Flooding",
    "Storm surge": "Coastal storm surge",
    Heat: "Extreme heat",
    "Water stress": "Water shortage"
  },
  I05: {
    "Strong data evidence": "Strong source",
    "Some data evidence": "Some source",
    "Narrative evidence only": "Only a short explanation",
    "Strong quantitative": "Strong source",
    Moderate: "Some source",
    "Qualitative only": "Only a short explanation"
  },
  I06: { Clear: "Yes, clearly", Partial: "Partly", Weak: "Weakly" },
  I08: {
    "Physical damage or service data": "Damage or service estimate",
    "Narrative estimate only": "Only a short explanation",
    Monetary: "Money estimate",
    Physical: "Damage or service estimate",
    Qualitative: "Only a short explanation",
    None: "No estimate"
  },
  I09: {
    "Measured directly": "Yes, from project data",
    "Estimated using similar data": "Yes, using similar examples",
    "Expert estimate": "Only expert judgement",
    "Directly quantified": "Yes, from project data",
    Proxy: "Yes, using similar examples",
    "Expert judgement": "Only expert judgement"
  },
  I10: {
    "Market prices available": "Yes, using prices or costs",
    "Approximate values available": "Yes, approximately",
    "Needs a valuation study": "Needs a study",
    "Direct market values": "Yes, using prices or costs",
    "Proxy values": "Yes, approximately",
    "Needs study": "Needs a study"
  },
  I14: { "Yes strong": "Yes, clearly" },
  I15: { All: "Yes, clear plan", Some: "Some plan", Minimal: "Very limited plan", None: "No plan" },
  I19: { Completed: "Done", Minimal: "Very limited", None: "No" },
  I21: { "Disclosed manageable": "Yes, but manageable", "Yes conflicting": "Yes, conflicting" }
};

const answerAliases = {};

let state = loadState();

function defaultState() {
  return {
    projectName: "",
    inputs: Object.fromEntries(questions.map((q) => [q.id, { answer: "", evidence: "", manualScore: null }]))
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return normalizeState(raw ? JSON.parse(raw) : defaultState());
  } catch {
    return normalizeState(defaultState());
  }
}

function normalizeState(next) {
  const normalized = defaultState();
  const merged = { ...normalized, ...next };
  merged.inputs = { ...normalized.inputs, ...(next.inputs || {}) };
  for (const q of questions) {
    merged.inputs[q.id] = {
      answer: "",
      evidence: "",
      manualScore: null,
      ...(merged.inputs[q.id] || {})
    };
    const answer = merged.inputs[q.id].answer;
    if (questionAnswerAliases[q.id]?.[answer]) {
      merged.inputs[q.id].answer = questionAnswerAliases[q.id][answer];
    } else if (answerAliases[answer]) {
      merged.inputs[q.id].answer = answerAliases[answer];
    }
  }
  return merged;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Local file storage can be disabled in some browser settings.
  }
}

function renderIcons() {
  document.querySelectorAll("[data-icon]").forEach((slot) => {
    const name = slot.getAttribute("data-icon");
    const path = iconPaths[name] || iconPaths.file;
    slot.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${path}"></path></svg>`;
  });
}

function getInput(id) {
  return state.inputs[id] || { answer: "", evidence: "", manualScore: null };
}

function hasAnswer(id) {
  const input = getInput(id);
  return String(input.answer || "").trim().length > 0 || String(input.evidence || "").trim().length > 0;
}

function deriveScore(q) {
  const input = getInput(q.id);
  const answer = String(input.answer || "").trim();
  if (!answer) return 0;
  if (q.scoreMap) return q.scoreMap[answer] ?? 2;
  if (q.input === "number") {
    const numeric = toNumber(answer);
    return Number.isFinite(numeric) && numeric > 0 ? 3 : 0;
  }
  return String(input.evidence || "").trim() ? 4 : 3;
}

function effectiveScore(q) {
  const input = getInput(q.id);
  return input.manualScore === null || input.manualScore === undefined ? deriveScore(q) : Number(input.manualScore);
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") return 0;
  const cleaned = String(value).replace(/,/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function computeStats() {
  const totalWeight = questions.reduce((sum, q) => sum + q.weight, 0);
  const weightedScore = questions.reduce((sum, q) => sum + q.weight * effectiveScore(q), 0) / totalWeight;
  const percent = weightedScore / 5;
  const hardStops = questions.filter((q) => q.hardStop && effectiveScore(q) < 2);
  const gaps = questions
    .filter((q) => !hasAnswer(q.id) || effectiveScore(q) < 3)
    .sort((a, b) => Number(b.hardStop) - Number(a.hardStop) || b.weight - a.weight);
  const answered = questions.filter((q) => hasAnswer(q.id)).length;
  let result;
  if (hardStops.length) result = { key: "stop", label: "Not ready yet - must fix key issue" };
  else if (percent >= 0.75) result = { key: "likely", label: "Likely ready for next review" };
  else if (percent >= 0.55) result = { key: "possible", label: "May be ready after follow-up" };
  else if (percent >= 0.4) result = { key: "weak", label: "Needs more support" };
  else result = { key: "stop", label: "Not ready yet" };
  const nextAction = hardStops.length
    ? "Fix key issues"
    : percent >= 0.75
      ? "Prepare for next review"
      : percent >= 0.55
        ? "Fill missing answers"
        : "Add basic support";
  return {
    weightedScore,
    percent,
    hardStops,
    gaps,
    answered,
    completeness: answered / questions.length,
    result,
    nextAction
  };
}

function formatNumber(value, max = 0) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: max }).format(value || 0);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const glossaryAliases = [...glossaryAliasMap.keys()].sort((a, b) => b.length - a.length);
const glossaryRegex = new RegExp(`(^|[^A-Za-z0-9])(${glossaryAliases.map(escapeRegExp).join("|")})(?=$|[^A-Za-z0-9])`, "gi");

function glossaryLinkedText(value) {
  const text = String(value ?? "");
  if (!text) return "";
  let result = "";
  let lastIndex = 0;
  for (const match of text.matchAll(glossaryRegex)) {
    const fullMatch = match[0];
    const prefix = match[1] || "";
    const term = match[2];
    const termStart = match.index + prefix.length;
    const termEnd = termStart + term.length;
    const slug = glossaryAliasMap.get(term.toLowerCase());
    if (!slug) continue;
    result += escapeHtml(text.slice(lastIndex, termStart));
    result += `<a class="glossary-link" href="#glossary-${escapeHtml(slug)}" data-term="${escapeHtml(slug)}">${escapeHtml(term)}</a>`;
    lastIndex = termEnd;
  }
  result += escapeHtml(text.slice(lastIndex));
  return result;
}

function helpTip(text, label = "More information") {
  if (!text) return "";
  return `<span class="help-tip" tabindex="0" aria-label="${escapeHtml(label)}" data-tip="${escapeHtml(text)}">?</span>`;
}

function scoreClass(score) {
  if (score >= 4) return "good";
  if (score >= 2) return "medium";
  return "bad";
}

function statusForResult(key) {
  return key === "likely" ? "likely" : key === "possible" ? "possible" : key === "weak" ? "weak" : "stop";
}

const springboardCategories = [
  {
    title: "Project fit",
    ids: ["I02", "I03", "I04", "I05", "I06"],
    summary: "Is this a clear climate-risk reduction project?",
    prompt: "Drill down into the climate-risk source, project boundary, and harm pathway."
  },
  {
    title: "Value case",
    ids: ["I08", "I09", "I10", "I11", "I12", "I22"],
    summary: "Can the avoided harm be estimated and valued?",
    prompt: "Collect rough before-and-after losses, pricing sources, income context, and scale evidence."
  },
  {
    title: "Additionality",
    ids: ["I13", "I14"],
    summary: "Does the project add something beyond what would happen anyway?",
    prompt: "Check permits, laws, existing budgets, committed works, and the role of the proposed funding."
  },
  {
    title: "Safeguards",
    ids: ["I17", "I18", "I19"],
    summary: "Could the project move risk or create serious harm?",
    prompt: "Review leakage, failure risk, affected people, consultation records, and unresolved concerns."
  },
  {
    title: "Evidence and claim",
    ids: ["I15", "I16", "I20", "I21"],
    summary: "Can results and ownership be checked later?",
    prompt: "Clarify monitoring records, outside review, right of use, claim ownership, and other benefit claims."
  }
];

function statusLabel(status) {
  if (status === "pass") return "Stronger";
  if (status === "request") return "Develop";
  return "Fix first";
}

function categoryStatus(ids) {
  const items = ids.map((id) => questions.find((q) => q.id === id)).filter(Boolean);
  const scores = items.map((q) => effectiveScore(q));
  const answeredCount = items.filter((q) => hasAnswer(q.id)).length;
  const avg = scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
  const hasBlockingWeakness = items.some((q) => q.hardStop && hasAnswer(q.id) && effectiveScore(q) < 2);
  const hasMissing = answeredCount < items.length;
  const status = hasBlockingWeakness || avg < 2 ? "stop" : hasMissing || avg < 3.5 ? "request" : "pass";
  return { status, avg, answeredCount, total: items.length };
}

function renderOverview() {
  const stats = computeStats();
  const scorePercent = Math.max(0, Math.min(100, Math.round(stats.percent * 100)));
  const resultBadge = document.getElementById("resultBadge");
  const scoreGauge = document.getElementById("scoreGauge");
  const scorePanel = document.querySelector(".score-panel");
  const statusClass = statusForResult(stats.result.key);

  scoreGauge.style.setProperty("--score-pct", `${scorePercent}%`);
  scoreGauge.className = `score-gauge ${statusClass}`;
  if (scorePanel) scorePanel.className = `score-panel ${statusClass}`;
  document.getElementById("scorePct").textContent = `${scorePercent}%`;
  document.getElementById("scoreValue").textContent = `${stats.weightedScore.toFixed(1)} / 5`;
  document.getElementById("hardStopCount").textContent = stats.hardStops.length;
  document.getElementById("gapCount").textContent = stats.gaps.length;
  document.getElementById("vrcCount").textContent = `${stats.answered}/${questions.length}`;
  document.getElementById("readinessScore").textContent = `${stats.weightedScore.toFixed(1)} / 5`;
  document.getElementById("grossValue").textContent = stats.result.label;
  document.getElementById("completeness").textContent = `${Math.round(stats.completeness * 100)}%`;
  document.getElementById("nextAction").textContent = stats.nextAction;
  resultBadge.textContent = stats.result.label;
  resultBadge.className = `result-badge ${statusClass}`;

  renderSectionScores();
  renderSpringboardCategories();
  renderPriorityGaps(stats);
}

function renderSectionScores() {
  const sections = [...new Set(questions.map((q) => q.section))];
  const rows = sections.map((section) => {
    const group = questions.filter((q) => q.section === section);
    const weighted = group.reduce((sum, q) => sum + q.weight * effectiveScore(q), 0);
    const weight = group.reduce((sum, q) => sum + q.weight, 0);
    const score = weight ? weighted / weight : 0;
    const pct = Math.round((score / 5) * 100);
    const color = pct >= 75 ? "var(--green)" : pct >= 55 ? "var(--amber)" : pct >= 40 ? "var(--blue)" : "var(--red)";
    return `
      <div class="bar-row">
        <div class="bar-label">${glossaryLinkedText(section)}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${color}"></div></div>
        <div class="bar-value">${pct}%</div>
      </div>`;
  });
  document.getElementById("sectionScores").innerHTML = rows.join("");
}

function renderPriorityGaps(stats) {
  const list = document.getElementById("priorityGaps");
  if (!stats.gaps.length) {
    list.innerHTML = `<div class="empty-state">No priority follow-ups at the current threshold.</div>`;
    return;
  }
  list.innerHTML = stats.gaps.slice(0, 6).map((q) => {
    const score = effectiveScore(q);
    const reason = !hasAnswer(q.id) ? "Missing answer" : score < 2 && q.hardStop ? "Must fix" : "Needs better support";
    return `
      <div class="priority-item">
        <span class="mini-pill ${scoreClass(score)}">${escapeHtml(q.id)}</span>
        <strong>${glossaryLinkedText(q.question)}</strong>
        <span class="status-pill ${reason === "Must fix" ? "stop" : "request"}">
          ${escapeHtml(reason)}
          ${helpTip(gapReasonHelp[reason], `${reason} explanation`)}
        </span>
      </div>`;
  }).join("");
}

function renderSpringboardCategories() {
  const target = document.getElementById("springboardCategories");
  if (!target) return;
  target.innerHTML = springboardCategories.map((category) => {
    const current = categoryStatus(category.ids);
    const pct = Math.round((current.avg / 5) * 100);
    const firstQuestion = questions.find((q) => q.id === category.ids[0]);
    const filterSection = firstQuestion ? firstQuestion.section : "All topics";
    return `
      <article class="springboard-card ${escapeHtml(current.status)}">
        <div class="springboard-topline">
          <span class="status-pill ${escapeHtml(current.status)}">${escapeHtml(statusLabel(current.status))}</span>
          <span class="springboard-count">${escapeHtml(String(current.answeredCount))}/${escapeHtml(String(current.total))} answered</span>
        </div>
        <h4>${glossaryLinkedText(category.title)}</h4>
        <p>${glossaryLinkedText(category.summary)}</p>
        <div class="springboard-meter" aria-hidden="true">
          <span style="width:${pct}%"></span>
        </div>
        <strong>${glossaryLinkedText(category.prompt)}</strong>
        <button class="question-action" type="button" data-go-tab="intake" data-section="${escapeHtml(filterSection)}">Drill down</button>
      </article>`;
  }).join("");
}

function renderSectionFilter() {
  const filter = document.getElementById("sectionFilter");
  const current = filter.value || "All topics";
  const sections = ["All topics", ...new Set(questions.map((q) => q.section))];
  filter.innerHTML = sections.map((section) => `<option value="${escapeHtml(section)}">${escapeHtml(section)}</option>`).join("");
  filter.value = sections.includes(current) ? current : "All topics";
}

function renderQuestionList() {
  const selected = document.getElementById("sectionFilter").value || "All topics";
  const visible = selected === "All topics" ? questions : questions.filter((q) => q.section === selected);
  document.getElementById("questionList").innerHTML = visible.map(renderQuestionCard).join("");
}

function renderQuestionCard(q) {
  const input = getInput(q.id);
  const score = effectiveScore(q);
  const manual = input.manualScore !== null && input.manualScore !== undefined;
  const categoryHelp = q.hardStop ? formHelp.majorBlocker : formHelp.weighted;
  const responseHelp = answerHelp[q.id] || formHelp.response;
  const sourceHelp = notesHelp[q.id] || formHelp.evidence;
  return `
    <article class="question-card" data-question-id="${escapeHtml(q.id)}">
      <div class="question-head">
        <div>
          <div class="question-kicker">
            <span class="question-id">${escapeHtml(q.id)}</span>
            <span class="mini-pill medium">${escapeHtml(q.section)}</span>
          </div>
          <div class="question-title-row">
            <h3 class="question-title">${glossaryLinkedText(q.question)}</h3>
            ${helpTip(questionHelp[q.id], `${q.id} question help`)}
          </div>
          ${q.note ? `<p class="note-text">${escapeHtml(q.note)}</p>` : ""}
        </div>
        <div class="question-meta">
          <span class="mini-pill ${q.hardStop ? "bad" : "medium"}">
            ${q.hardStop ? "Must fix if weak" : "Counts in result"}
            ${helpTip(categoryHelp, q.hardStop ? "Must-fix help" : "Result help")}
          </span>
          <span class="mini-pill good">
            ${Math.round(q.weight * 100)}%
            ${helpTip(`${formHelp.weight} This question is ${Math.round(q.weight * 100)}% of the result.`, "Result weight help")}
          </span>
        </div>
      </div>
      <div class="question-grid">
        <div class="field">
          <label for="${q.id}-answer">
            Answer
            ${helpTip(responseHelp, "Answer help")}
          </label>
          ${renderAnswerInput(q, input.answer)}
        </div>
        <div class="field">
          <label for="${q.id}-evidence">
            Notes or source
            ${helpTip(sourceHelp, "Notes help")}
          </label>
          <textarea id="${q.id}-evidence" data-id="${q.id}" data-field="evidence" placeholder="${escapeHtml(q.example || "Notes, source, or applicant answer")}">${escapeHtml(input.evidence)}</textarea>
        </div>
        <div class="score-control">
          <div class="score-line">
            <label for="${q.id}-score">
              Strength 0-5
              ${helpTip(formHelp.score, "Strength help")}
            </label>
            <span class="score-value" data-score-value="${q.id}">${score}</span>
          </div>
          <input id="${q.id}-score" data-id="${q.id}" data-field="score" type="range" min="0" max="5" step="1" value="${score}" />
          <button class="question-action" type="button" data-action="auto-score" data-id="${q.id}">${manual ? "Manual" : "Auto"}</button>
        </div>
      </div>
    </article>`;
}

function renderAnswerInput(q, value) {
  const id = `${q.id}-answer`;
  if (q.input === "select") {
    return `
      <select id="${id}" data-id="${q.id}" data-field="answer">
        <option value=""></option>
        ${q.options.map((option) => `<option value="${escapeHtml(option)}" ${value === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
      </select>`;
  }
  const type = q.input === "number" ? "number" : "text";
  if (type === "number") {
    return `<input id="${id}" data-id="${q.id}" data-field="answer" type="number" value="${escapeHtml(value)}" placeholder="${escapeHtml(q.example || q.responseType)}" />`;
  }
  return `<textarea id="${id}" data-id="${q.id}" data-field="answer" placeholder="${escapeHtml(q.example || q.responseType)}">${escapeHtml(value)}</textarea>`;
}

function updateQuestionScoreDisplay(id) {
  const q = questions.find((item) => item.id === id);
  if (!q) return;
  const score = effectiveScore(q);
  const card = document.querySelector(`[data-question-id="${CSS.escape(id)}"]`);
  if (!card) return;
  const value = card.querySelector(`[data-score-value="${CSS.escape(id)}"]`);
  const range = card.querySelector(`[data-field="score"]`);
  const button = card.querySelector(`[data-action="auto-score"]`);
  if (value) value.textContent = score;
  if (range && document.activeElement !== range) range.value = score;
  if (button) {
    const manual = getInput(id).manualScore !== null && getInput(id).manualScore !== undefined;
    button.textContent = manual ? "Manual" : "Auto";
  }
}

function evaluateDecisions() {
  const stats = computeStats();
  const score = (id) => effectiveScore(questions.find((q) => q.id === id));
  const answered = (id) => hasAnswer(id);
  const stopIf = (id) => (answered(id) && score(id) < 2 ? "stop" : !answered(id) ? "request" : "pass");
  const requestIfLow = (ids) => {
    if (ids.some((id) => answered(id) && score(id) < 2)) return "stop";
    if (ids.some((id) => !answered(id) || score(id) < 3)) return "request";
    return "pass";
  };
  const composite = stats.result.key === "stop" ? "stop" : stats.result.key === "likely" ? "pass" : "score";
  return [
    ["1", "Is this a climate-risk project?", answered("I02") || answered("I04") ? "pass" : "request", "The project reduces a climate-related risk.", "Clarify the climate risk before continuing.", "Stop"],
    ["2", "Do we know what the project covers?", stopIf("I03"), "The project area, service, assets, or users are clear.", "Clarify the project area or service first.", "Ask for more"],
    ["3", "Can we explain the harm?", requestIfLow(["I05", "I06"]), "The climate risk and harm are linked clearly.", "Clarify how the climate risk causes harm.", "Stop"],
    ["4", "Can we compare before and after?", requestIfLow(["I08", "I09"]), "There is at least a rough before-and-after estimate.", "Ask for a rough estimate of losses before and after the project.", "Ask for more"],
    ["5", "Can avoided harm be valued?", stopIf("I10"), "There is a practical way to put a money value on avoided harm.", "Ask how the avoided harm could be priced.", "Ask for more"],
    ["6", "Is the likely benefit big enough?", requestIfLow(["I11", "I22"]), "The project has a rough benefit or scale case.", "Ask for a rough value or scale estimate.", "Ask for more"],
    ["7", "Is the project adding something new?", stopIf("I13"), "The project is not only doing what is already required or funded.", "Clarify what is new, better, bigger, or faster.", "Stop"],
    ["8", "Could anyone be worse off?", requestIfLow(["I17", "I18"]), "No high unresolved risk of shifted harm or serious failure.", "Explain and manage any risk to others.", "Fix risk"],
    ["9", "Can results be checked?", requestIfLow(["I15", "I16"]), "There is a practical plan to check results.", "Strengthen the plan for checking results.", "Ask for more"],
    ["10", "Is the claim owner clear?", requestIfLow(["I20", "I21"]), "One claim owner is clear and other claims are manageable.", "Clarify who can claim the benefit.", "Check claim"],
    ["11", "Overall result", composite, "No must-fix items and the overall strength is high enough for next review.", "Focus on the missing or weak answers first.", "Result"]
  ];
}

function renderDecisionTree() {
  const labelMap = { pass: "Pass", request: "Ask for more", stop: "Stop", score: "Use result" };
  document.getElementById("decisionTree").innerHTML = evaluateDecisions().map(([step, test, status, pass, fail, route]) => `
    <article class="decision-card">
      <div class="decision-step">${escapeHtml(step)}</div>
      <div>
        <strong>
          ${glossaryLinkedText(test)}
          ${helpTip(decisionHelp[step], `Decision ${step} help`)}
        </strong>
        <p>${glossaryLinkedText(status === "pass" ? pass : fail)}</p>
      </div>
      <span class="status-pill ${escapeHtml(status)}">${escapeHtml(labelMap[status])} - ${escapeHtml(route)}</span>
    </article>`).join("");
}

function renderTable(targetId, headers, rows) {
  const table = `
    <table>
      <thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows.map((row) => `<tr>${row.map((cell) => `<td>${glossaryLinkedText(cell)}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>`;
  document.getElementById(targetId).innerHTML = table;
}

function renderMissingCategories() {
  const target = document.getElementById("missingCategories");
  if (!target) return;
  target.innerHTML = missingCategories.map((category) => `
    <article class="missing-category-card">
      <h3>${glossaryLinkedText(category.title)}</h3>
      <p>${glossaryLinkedText(category.summary)}</p>
      <p class="missing-rationale">${glossaryLinkedText(category.rationale)}</p>
      <div class="missing-items">
        ${category.items.map(([label, need, example]) => `
          <div class="missing-item">
            <strong>${glossaryLinkedText(label)}</strong>
            <span>${glossaryLinkedText(need)}</span>
            <em>${glossaryLinkedText(example)}</em>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderGlossary() {
  const list = document.getElementById("glossaryList");
  if (!list) return;
  list.innerHTML = glossaryTerms.map((item) => `
    <article id="glossary-${escapeHtml(item.slug)}" class="glossary-card" tabindex="-1">
      <h3>${escapeHtml(item.term)}</h3>
      <p>${escapeHtml(item.definition)}</p>
      <div class="glossary-aliases">
        ${item.aliases.slice(0, 5).map((alias) => `<span>${escapeHtml(alias)}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderStaticTables() {
  renderMissingCategories();
  renderTable("crosswalkTable", ["Topic", "What we need", "What may still be missing", "What to ask for"], crosswalk);
  renderTable("dataModel", ["Topic", "Information saved", "Format", "Needed?", "Example", "Check"], dataModel);
  renderGlossary();
}

function renderDashboardViews() {
  renderOverview();
  renderDecisionTree();
}

function switchTab(tab) {
  document.querySelectorAll(".nav-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === tab);
  });
}

function openGlossaryTerm(slug) {
  switchTab("glossary");
  window.location.hash = `glossary-${slug}`;
  requestAnimationFrame(() => {
    document.querySelectorAll(".glossary-card.is-highlighted").forEach((card) => card.classList.remove("is-highlighted"));
    const card = document.getElementById(`glossary-${slug}`);
    if (!card) return;
    card.classList.add("is-highlighted");
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    card.focus({ preventScroll: true });
  });
}

function downloadFile(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportJson() {
  downloadFile("vrc-tier0-project-check.json", JSON.stringify(state, null, 2), "application/json");
}

function makeReport() {
  const stats = computeStats();
  const lines = [
    "# VRC Tier 0 Project Check",
    "",
    `Project: ${state.projectName || "Untitled project"}`,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    `Result: ${stats.result.label}`,
    `Overall strength: ${stats.weightedScore.toFixed(2)} / 5 (${Math.round(stats.percent * 100)}%)`,
    `Must-fix items: ${stats.hardStops.length}`,
    `Missing or weak answers: ${stats.gaps.length}`,
    "",
    "## Fix these first",
    ""
  ];
  const gaps = stats.gaps.slice(0, 10);
  if (gaps.length) {
    gaps.forEach((q) => lines.push(`- ${q.id}: ${q.question} (strength ${effectiveScore(q)}/5)`));
  } else {
    lines.push("- None at the current threshold.");
  }
  lines.push("", "## Answers", "");
  questions.forEach((q) => {
    const input = getInput(q.id);
    lines.push(`### ${q.id} - ${q.question}`);
    lines.push(`Strength: ${effectiveScore(q)} / 5`);
    lines.push(`Response: ${input.answer || ""}`);
    lines.push(`Notes or source: ${input.evidence || ""}`);
    lines.push("");
  });
  return lines.join("\n");
}

function exportReport() {
  const filename = `${(state.projectName || "vrc-tier0-report").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "vrc-tier0-report"}.md`;
  downloadFile(filename, makeReport(), "text/markdown");
}

function importJsonFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = normalizeState(JSON.parse(String(reader.result || "{}")));
      saveState();
      initializeFormValues();
      renderQuestionList();
      renderDashboardViews();
    } catch {
      alert("The selected JSON file could not be imported.");
    }
  };
  reader.readAsText(file);
}

function resetApp() {
  if (!confirm("Reset all screening inputs?")) return;
  state = defaultState();
  saveState();
  initializeFormValues();
  renderQuestionList();
  renderDashboardViews();
}

function loadTokyoExample() {
  state = defaultState();
  state.projectName = "Tokyo storm and flood risk-reduction measures";
  const fill = (id, answer, evidence = "") => {
    state.inputs[id] = { answer, evidence, manualScore: null };
  };
  fill("I01", state.projectName, "Example materials describe measures focused on storm and flood damage.");
  fill("I02", "Directly reduces risk", "The measures are intended to directly reduce storm and flood risk.");
  fill("I03", "Partly", "The project area is likely definable, but the exact area and affected service still need mapping.");
  fill("I04", "Flooding", "The materials refer to storm and flood damage measures.");
  fill("I05", "Some source", "The climate-change link should be backed with clearer sources.");
  fill("I06", "Yes, clearly", "Storm and flood risk can be linked to urban assets, services, and residents.");
  fill("I07", "Residents, public infrastructure, service users, and flood-exposed assets.", "A rough count or inventory should be added later.");
  fill("I08", "Only a short explanation", "A loss estimate without the project still needs to be built.");
  fill("I09", "Only expert judgement", "The project effect still needs modelling or stronger support.");
  fill("I10", "Needs a study", "Avoided harm still needs to be converted into money terms.");
  fill("I11", "0", "No avoided-harm estimate entered in the example.");
  fill("I12", "1.0 high-income public project estimate", "Likely 1 for a high-income public project unless more specific community income data is used.");
  fill("I13", "Unknown", "Need to check whether the work is already required, already funded, or improved by this funding.");
  fill("I14", "Yes, clearly", "Funding can support storm and flood project delivery and reporting.");
  fill("I15", "Yes, clear plan", "The example appears strong on reporting and public management capacity.");
  fill("I16", "Probably", "The outside check should be confirmed against available monitoring data.");
  fill("I17", "Low", "No high unresolved risk of moving climate risk elsewhere identified at example level.");
  fill("I18", "Low", "Serious failure risk remains a later review item.");
  fill("I19", "Planned", "Tokyo requires adequate explanations to local residents.");
  fill("I20", "Tokyo Metropolitan Government", "Claim owner and data responsibilities require confirmation.");
  fill("I21", "Yes, but manageable", "Other claims and reporting should be listed and checked.");
  fill("I22", "Possible", "Possible VRC benefit cannot be assessed until loss estimates are entered.");
  saveState();
  initializeFormValues();
  renderQuestionList();
  renderDashboardViews();
}

function initializeFormValues() {
  document.getElementById("projectName").value = state.projectName || "";
}

function bindEvents() {
  document.querySelector(".nav-tabs").addEventListener("click", (event) => {
    const button = event.target.closest(".nav-tab");
    if (button) switchTab(button.dataset.tab);
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest(".glossary-link");
    if (!link) return;
    event.preventDefault();
    openGlossaryTerm(link.dataset.term);
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-go-tab]");
    if (!button) return;
    const targetTab = button.dataset.goTab;
    switchTab(targetTab);
    if (targetTab === "intake" && button.dataset.section) {
      const filter = document.getElementById("sectionFilter");
      filter.value = button.dataset.section;
      renderQuestionList();
    }
  });

  document.getElementById("projectName").addEventListener("input", (event) => {
    state.projectName = event.target.value;
    state.inputs.I01.answer = event.target.value;
    saveState();
    updateQuestionScoreDisplay("I01");
    renderDashboardViews();
  });

  document.getElementById("sectionFilter").addEventListener("change", renderQuestionList);

  document.getElementById("questionList").addEventListener("input", handleQuestionInput);
  document.getElementById("questionList").addEventListener("change", handleQuestionInput);
  document.getElementById("questionList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='auto-score']");
    if (!button) return;
    const id = button.dataset.id;
    state.inputs[id].manualScore = null;
    saveState();
    updateQuestionScoreDisplay(id);
    renderDashboardViews();
  });

  document.getElementById("loadExample").addEventListener("click", loadTokyoExample);
  document.getElementById("exportJson").addEventListener("click", exportJson);
  document.getElementById("exportReport").addEventListener("click", exportReport);
  document.getElementById("resetApp").addEventListener("click", resetApp);
  document.getElementById("importJson").addEventListener("click", () => document.getElementById("jsonFile").click());
  document.getElementById("jsonFile").addEventListener("change", (event) => importJsonFile(event.target.files[0]));
}

function handleQuestionInput(event) {
  const target = event.target;
  const id = target.dataset.id;
  const field = target.dataset.field;
  if (!id || !field || !state.inputs[id]) return;

  if (field === "score") {
    state.inputs[id].manualScore = Number(target.value);
  } else {
    state.inputs[id][field] = target.value;
    if (id === "I01" && field === "answer") {
      state.projectName = target.value;
      document.getElementById("projectName").value = target.value;
    }
  }

  saveState();
  updateQuestionScoreDisplay(id);
  renderDashboardViews();
}

function init() {
  renderIcons();
  renderSectionFilter();
  renderStaticTables();
  initializeFormValues();
  renderQuestionList();
  renderDashboardViews();
  bindEvents();
}

init();
