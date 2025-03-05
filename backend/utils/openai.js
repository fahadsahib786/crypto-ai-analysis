// // backend/utils/openai.js
// const fetch = require('node-fetch');

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// const analyzeData = async (data) => {
//   let prompt = `Analyze this small-cap token project:\n\n`;
//   for (const [key, value] of Object.entries(data)) {
//     prompt += `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${value}\n`;
//   }
  
//   prompt += `
//     Key Analysis Points:
//     * Rate the project overall on a scale of 1-10.
//     * Assess the team's experience and credibility.
//     * Evaluate the clarity and feasibility of the whitepaper.
//     * Analyze the tokenomics for fairness and sustainability.
//     * Comment on the project's technology choice.
//     * Rate the community engagement and marketing efforts.
//     * Assess the roadmap's clarity and ambition.
//     * Note any strengths or weaknesses.
//     * Provide an overall summary and recommendation.
//   `;

//   const response = await fetch('https://api.openai.com/v1/completions', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${OPENAI_API_KEY}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo-instruct',
//       prompt: prompt,
//       max_tokens: 500
//     })
//   });

//   const dataResponse = await response.json();
//   return dataResponse.choices[0].text.trim();
// };

// module.exports = { analyzeData };


const fetch = require('node-fetch');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is missing. Please set it in your environment variables.');
}

// Helper function to generate the analysis prompt
const generatePrompt = (data, promptIndex = 0) => {
   const promptArray = [
    // 0
    `
    Analyze the cryptocurrency project and provide structured insights:
    1. **Overall Rating (1-100):** Provide a numerical rating with justification.
    2. **Team Assessment:** Evaluate the team's experience, expertise, and credibility.
    3. **Whitepaper Analysis:** Assess the clarity, feasibility, and strengths/weaknesses of the whitepaper.
    4. **Tokenomics:** Analyze token supply, allocation, vesting, and sustainability.
    5. **Community Engagement:** Rate community size, activity, and sentiment.
    6. **Roadmap:** Review clarity, feasibility, and ambition of the roadmap.
    7. **Strengths & Weaknesses:** Identify key strengths and weaknesses.
    8. **Recommendations:** Provide actionable advice for stakeholders.
  
    ### Output Format
    {
      "overallRating": number,
      "team": "string",
      "whitepaper": "string",
      "tokenomics": "string",
      "community": "string",
      "roadmap": "string",
      "strengths": ["array of strings"],
      "weaknesses": ["array of strings"],
      "recommendations": "string"
    }
    `,
  
    // 1
    `
    Analyze the project's mission, vision, and value proposition:
    1. **Mission:** What problem does the project aim to solve?
    2. **Vision:** How does the project plan to achieve its mission?
    3. **Value Proposition:** How does the project differentiate itself?
    4. **Roadmap Feasibility:** Are milestones realistic and industry-aligned?
    5. **Whitepaper Evaluation:** Rate clarity (1-10), technical depth (1-10), feasibility (1-10).
  
    ### Output Format
    {
      "mission": "string",
      "vision": "string",
      "valueProposition": "string",
      "roadmapFeasibility": "string",
      "whitepaper": {
        "clarity": number,
        "technicalDepth": number,
        "feasibility": number
      }
    }
    `,
  
    // 2
    `
    Analyze the project's tokenomics and blockchain technology:
    1. **Tokenomics:** Detail supply, allocation, and mechanisms like staking/burning.
    2. **Blockchain Use:** Explain the choice of blockchain and its unique features.
    3. **Comparison:** Compare with similar blockchain projects.
  
    ### Output Format
    {
      "tokenomics": "string",
      "blockchain": {
        "choice": "string",
        "features": "string",
        "benefits": "string"
      },
      "comparison": "string"
    }
    `,
  
    // 3
    `
    Evaluate the project's team and partnerships:
    1. **Team Background:** Highlight key members’ expertise.
    2. **Advisors:** Assess advisors' contributions and influence.
    3. **Partnerships:** Detail strategic and potential partnerships.
  
    ### Output Format
    {
      "team": "string",
      "advisors": "string",
      "partnerships": "string"
    }
    `,
  
    // 4
    `
    Evaluate the project's community engagement and sentiment:
    1. **Community Activity:** Analyze activity on platforms like Twitter, Telegram.
    2. **Sentiment:** Summarize community feedback (positive/negative).
    3. **Team Responsiveness:** How effectively does the team address concerns?
  
    ### Output Format
    {
      "communityActivity": "string",
      "sentiment": "string",
      "teamResponsiveness": "string"
    }
    `,
  
    // 5
    `
    Assess the project's regulatory compliance and security measures:
    1. **Regulatory Compliance:** Detail adherence to regulations like GDPR/CCPA.
    2. **Security Measures:** Review protocols, audits, and breach history.
  
    ### Output Format
    {
      "regulatoryCompliance": "string",
      "securityMeasures": "string"
    }
    `,
  
    // 6
    `
    Analyze the project's funding and governance:
    1. **Funding:** Detail funding sources, sustainability, and transparency.
    2. **Governance:** Review decision-making processes and community involvement.
  
    ### Output Format
    {
      "funding": "string",
      "governance": "string"
    }
    `,
  
    // 7
    `
    Evaluate the project's market potential and scalability:
    1. **Market Position:** Assess the competitive landscape and target audience.
    2. **Scalability:** Discuss scalability solutions and challenges.
  
    ### Output Format
    {
      "marketPosition": "string",
      "scalability": "string"
    }
    `,
  
    // 8
    `
    Review product development and user metrics:
    1. **Current Development:** Summarize technical progress and achievements.
    2. **User Metrics:** Analyze adoption rates, retention, and future projections.
  
    ### Output Format
    {
      "development": "string",
      "userMetrics": "string"
    }
    `,
  
    // 9
    `
    Analyze the project's token utility and real-world applications:
    1. **Token Utility:** List token functions and ecosystem benefits.
    2. **Adoption:** Highlight success stories and use cases.
  
    ### Output Format
    {
      "tokenUtility": "string",
      "adoption": "string"
    }
    `,
  
    // 10
    `
    Evaluate the project's economic model and competitive advantages:
    1. **Revenue Model:** Discuss revenue streams and sustainability.
    2. **Competitive Strengths:** Highlight unique features.
  
    ### Output Format
    {
      "revenueModel": "string",
      "competitiveStrengths": "string"
    }
    `,
  
    // 11
    `
    Assess risks and audits:
    1. **Risks:** Identify potential challenges and mitigation strategies.
    2. **Audit Reports:** Summarize findings and responses to audits.
  
    ### Output Format
    {
      "risks": "string",
      "audits": "string"
    }
    `,
  
    // 12
    `
    Analyze the project's branding and positioning:
    1. **Brand Identity:** Assess branding strategies and public perception.
    2. **Marketing Efforts:** Evaluate campaign effectiveness.
  
    ### Output Format
    {
      "brandIdentity": "string",
      "marketingEfforts": "string"
    }
    `,
  
    // 13
    `
    Review user experience and feedback:
    1. **UX/UI:** Evaluate the design and usability.
    2. **Feedback:** Analyze implementation of user suggestions.
  
    ### Output Format
    {
      "ux": "string",
      "feedback": "string"
    }
    `,
  
    // 14
    `
    Assess the project's environmental impact and sustainability:
    1. **Environmental Impact:** Review eco-friendly practices and energy efficiency.
    2. **Sustainability Goals:** Summarize long-term environmental commitments.
  
    ### Output Format
    {
      "environmentalImpact": "string",
      "sustainabilityGoals": "string"
    }
    `,
  
    // 15
    `
    Evaluate the project's technological innovation and decentralization:
    1. **Innovation:** Highlight unique technological achievements.
    2. **Decentralization:** Review governance and operational structures.
  
    ### Output Format
    {
      "innovation": "string",
      "decentralization": "string"
    }
    `,
  
    // 16
    `
    Analyze the project's ecosystem and interoperability:
    1. **Ecosystem:** Detail partnerships and integrations.
    2. **Interoperability:** Assess compatibility with other blockchains.
  
    ### Output Format
    {
      "ecosystem": "string",
      "interoperability": "string"
    }
    `,
  
    // 17
    `
    Assess education and developer support:
    1. **Education Initiatives:** Summarize user and developer training programs.
    2. **Developer Support:** Review tools and contributions from the developer community.
  
    ### Output Format
    {
      "education": "string",
      "developerSupport": "string"
    }
    `,
  
    // 18
    `
    Review the project's financial inclusion efforts:
    1. **Economic Impact:** Highlight contributions to underserved populations.
    2. **Incentive Programs:** Discuss user rewards and sustainability.
  
    ### Output Format
    {
      "economicImpact": "string",
      "incentivePrograms": "string"
    }
    `,
  
    // 19
    `
    Evaluate data privacy and communication:
    1. **Privacy Measures:** Assess data security and regulatory compliance.
    2. **Communication Transparency:** Review update frequency and clarity.
  
    ### Output Format
    {
      "privacyMeasures": "string",
      "communication": "string"
    }
    `
  ];

  if (promptIndex < 0 || promptIndex >= promptArray.length) {
    throw new Error('Invalid prompt index provided.');
  }

  const basePrompt = promptArray[promptIndex];
  const dataDescription = Object.entries(data)
    .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}: ${value}`)
    .join('\n');

  return `${basePrompt}\n\n${dataDescription}`;
};

// Main function to analyze data using OpenAI
const analyzeData = async (data, promptIndex = 0) => {
  try {
    const prompt = generatePrompt(data, promptIndex);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a cryptocurrency analyst specializing in in-depth project evaluation and market research.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 4096,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API Error: ${response.statusText}`);
    }

    const dataResponse = await response.json();
    const messageContent = dataResponse.choices[0]?.message?.content?.trim();
    return messageContent || 'No response from AI.';
  } catch (error) {
    console.error('Error analyzing data:', error.message);
    throw new Error('Failed to analyze data. Please try again later.');
  }
};

module.exports = { analyzeData };
