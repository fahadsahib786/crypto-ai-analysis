import axios from "axios";
export const formatAnalysis = (analysis) => {
    const linesArr = analysis.split(/(?<=\.) (?=\d)|(?<=\.) /); // Split before digits followed by a dot
        const regex = /(\d+)/;

        const match = linesArr[0].split(regex);
        if(match){
          linesArr.shift()
          linesArr.unshift(match[2])
          linesArr.unshift(match[0] + match[1])
        }
        return linesArr
}
export const fetchProfile = async (user) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_ROUTE_URI}/api/profile/fetch`, {
      userId: user?.userId,
    });
    return response.data
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}; 

export const verifyOtp = async (otp, email) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_ROUTE_URI}/auth/verify-otp`, {
      otp,
      email
    },{
      withCredentials:true
    });

    if (response.status === 200) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Error verifying OTP' };
  }
};

export const AiCryptoArray = [
    {
      "name": "NEAR Protocol",
      "code": "NEAR",
      "rank": 19,
      "count": 1
    },
    {
      "name": "Fetch.ai",
      "code": "FET",
      "rank": 30,
      "count": 2
    },
    {
      "name": "Render Token",
      "code": "RNDR",
      "rank": 36,
      "count": 3
    },
    {
      "name": "Injective Protocol",
      "code": "INJ",
      "rank": 44,
      "count": 4
    },
    {
      "name": "The Graph",
      "code": "GRT",
      "rank": 49,
      "count": 5
    },
    {
      "name": "Theta Network",
      "code": "THETA",
      "rank": 57,
      "count": 6
    },
    {
      "name": "Akash Network",
      "code": "AKT",
      "rank": 78,
      "count": 7
    },
    {
      "name": "AIOZ Network",
      "code": "AIOZ",
      "rank": 115,
      "count": 8
    },
    {
      "name": "Oasis Network",
      "code": "ROSE",
      "rank": 119,
      "count": 9
    },
    {
      "name": "Theta Fuel",
      "code": "TFUEL",
      "rank": 121,
      "count": 10
    },
    {
      "name": "SingularityNET",
      "code": "AGIX",
      "rank": 132,
      "count": 11
    },
    {
      "name": "CorgiAI",
      "code": "CORGIAI",
      "rank": 145,
      "count": 12
    },
    {
      "name": "OriginTrail",
      "code": "TRAC",
      "rank": 168,
      "count": 13
    },
    {
      "name": "Golem",
      "code": "GLM",
      "rank": 177,
      "count": 14
    },
    {
      "name": "Ocean Protocol",
      "code": "OCEAN",
      "rank": 189,
      "count": 15
    },
    {
      "name": "Arcblock",
      "code": "ABT",
      "rank": 200,
      "count": 16
    },
    {
      "name": "QUBIC",
      "code": "QUBIC",
      "rank": 218,
      "count": 17
    },
    {
      "name": "Marlin",
      "code": "POND",
      "rank": 220,
      "count": 18
    },
    {
      "name": "Kadena",
      "code": "KDA",
      "rank": 225,
      "count": 19
    },
    {
      "name": "iExec RLC",
      "code": "RLC",
      "rank": 239,
      "count": 20
    },
    {
      "name": "Phala Network",
      "code": "PHA",
      "rank": 247,
      "count": 21
    },
    {
      "name": "Oraichain",
      "code": "ORAI",
      "rank": 261,
      "count": 22
    },
    {
      "name": "IQ",
      "code": "IQ",
      "rank": 269,
      "count": 23
    },
    {
      "name": "Numeraire",
      "code": "NMR",
      "rank": 287,
      "count": 24
    },
    {
      "name": "Cudos",
      "code": "CUDOS",
      "rank": 329,
      "count": 25
    },
    {
      "name": "Aleph.im",
      "code": "ALEPH",
      "rank": 382,
      "count": 26
    },
    {
      "name": "Autonolas",
      "code": "OLAS",
      "rank": 384,
      "count": 27
    },
    {
      "name": "PlatON",
      "code": "LAT",
      "rank": 407,
      "count": 28
    },
    {
      "name": "Cortex",
      "code": "CTXC",
      "rank": 435,
      "count": 29
    },
    {
      "name": "Verasity",
      "code": "VRA",
      "rank": 464,
      "count": 30
    },
    {
      "name": "Vaiot",
      "code": "VAI",
      "rank": 471,
      "count": 31
    },
    {
      "name": "Covalent Query Token",
      "code": "CQT",
      "rank": 475,
      "count": 32
    },
    {
      "name": "Selfkey",
      "code": "KEY",
      "rank": 489,
      "count": 33
    },
    {
      "name": "Measurable Data Token",
      "code": "MDT",
      "rank": 492,
      "count": 34
    },
    {
      "name": "Trias Token",
      "code": "TRIAS",
      "rank": 499,
      "count": 35
    },
    {
      "name": "Sentinel Protocol",
      "code": "UPP",
      "rank": 506,
      "count": 36
    },
    {
      "name": "GraphLinq Chain",
      "code": "GLQ",
      "rank": 532,
      "count": 37
    },
    {
      "name": "PARSIQ",
      "code": "PRQ",
      "rank": 545,
      "count": 38
    },
    {
      "name": "Vectorspace AI",
      "code": "VXV",
      "rank": 555,
      "count": 39
    },
    {
      "name": "Lambda",
      "code": "LAMB",
      "rank": 557,
      "count": 40
    },
    {
      "name": "Züs",
      "code": "ZCN",
      "rank": 611,
      "count": 41
    },
    {
      "name": "Matrix AI Network",
      "code": "MAN",
      "rank": 616,
      "count": 42
    },
    {
      "name": "DIA",
      "code": "DIA",
      "rank": 629,
      "count": 43
    },
    {
      "name": "Deri Protocol",
      "code": "DERI",
      "rank": 639,
      "count": 44
    },
    {
      "name": "Dock",
      "code": "DOCK",
      "rank": 660,
      "count": 45
    },
    {
      "name": "Ispolink",
      "code": "ISP",
      "rank": 664,
      "count": 46
    },
    {
      "name": "DeepBrain Chain",
      "code": "DBC",
      "rank": 667,
      "count": 47
    },
    {
      "name": "Santiment Network Token",
      "code": "SAN",
      "rank": 685,
      "count": 48
    },
    {
      "name": "Robonomics Network",
      "code": "XRT",
      "rank": 698,
      "count": 49
    },
    {
      "name": "Presearch",
      "code": "PRE",
      "rank": 720,
      "count": 50
    },
    {
      "name": "Unmarshal",
      "code": "MARSH",
      "rank": 733,
      "count": 51
    },
    {
      "name": "Lumerin",
      "code": "LMR",
      "rank": 745,
      "count": 52
    },
    {
      "name": "ClinTex CTi",
      "code": "CTI",
      "rank": 760,
      "count": 53
    },
    {
      "name": "Lossless",
      "code": "LSS",
      "rank": 763,
      "count": 54
    },
    {
      "name": "Raven Protocol",
      "code": "RAVEN",
      "rank": 770,
      "count": 55
    },
    {
      "name": "dotmoovs",
      "code": "MOOV",
      "rank": 799,
      "count": 56
    },
    {
      "name": "aiRight",
      "code": "AIRI",
      "rank": 832,
      "count": 57
    },
    {
      "name": "Unobtanium",
      "code": "UNO",
      "rank": 860,
      "count": 58
    },
    {
      "name": "Bird.Money",
      "code": "BIRD",
      "rank": 871,
      "count": 59
    },
    {
      "name": "Verox",
      "code": "VRX",
      "rank": 873,
      "count": 60
    },
    {
      "name": "Darwinia Network Native Token",
      "code": "RING",
      "rank": 880,
      "count": 61
    },
    {
      "name": "Roobee",
      "code": "ROOBEE",
      "rank": 898,
      "count": 62
    },
    {
      "name": "XMON",
      "code": "XMON",
      "rank": 921,
      "count": 63
    },
    {
      "name": "LBRY Credits",
      "code": "LBC",
      "rank": 950,
      "count": 64
    },
    {
      "name": "Scry.info",
      "code": "DDD",
      "rank": 994,
      "count": 65
    },
    {
      "name": "Raze Network",
      "code": "RAZE",
      "rank": 1040,
      "count": 66
    },
    {
      "name": "Phantasma",
      "code": "SOUL",
      "rank": 1121,
      "count": 67
    },
    {
      "name": "Arkham",
      "code": "ARKM",
      "rank": 1141,
      "count": 68
    },
    {
      "name": "Phoenix Global",
      "code": "PHB",
      "rank": 1201,
      "count": 69
    },
    {
      "name": "Solidus Ai Tech",
      "code": "AITECH",
      "rank": 1206,
      "count": 70
    },
    {
      "name": "GT Protocol",
      "code": "GTAI",
      "rank": 1214,
      "count": 71
    },
    {
      "name": "Ooki Protocol",
      "code": "OOKI",
      "rank": 1228,
      "count": 72
    },
    {
      "name": "ChainGPT",
      "code": "CGPT",
      "rank": 1230,
      "count": 73
    },
    {
      "name": "Step App",
      "code": "FITFI",
      "rank": 1239,
      "count": 74
    },
    {
      "name": "Zignaly",
      "code": "ZIG",
      "rank": 1261,
      "count": 75
    },
    {
      "name": "LimeWire Token",
      "code": "LMWR",
      "rank": 1266,
      "count": 76
    },
    {
      "name": "Streamr DATAcoin",
      "code": "DATA",
      "rank": 1300,
      "count": 77
    },
    {
      "name": "Dimitra",
      "code": "DMTR",
      "rank": 1354,
      "count": 78
    },
    {
      "name": "DarkShield",
      "code": "DKS",
      "rank": 1364,
      "count": 79
    },
    {
      "name": "RSS3",
      "code": "RSS3",
      "rank": 1366,
      "count": 80
    },
    {
      "name": "Hook Protocol",
      "code": "HOOK",
      "rank": 1374,
      "count": 81
    },
    {
      "name": "iMe Lab",
      "code": "LIME",
      "rank": 1388,
      "count": 82
    },
    {
      "name": "HYPERGPT",
      "code": "HGPT",
      "rank": 1389,
      "count": 83
    },
    {
      "name": "Numbers Protocol",
      "code": "NUM",
      "rank": 1455,
      "count": 84
    },
    {
      "name": "V-ID",
      "code": "VIDT",
      "rank": 1463,
      "count": 85
    },
    {
      "name": "AIPAD.tech",
      "code": "AIPAD",
      "rank": 1485,
      "count": 86
    },
    {
      "name": "Cere Network",
      "code": "CERE",
      "rank": 1531,
      "count": 87
    },
    {
      "name": "DexCheck",
      "code": "DCK",
      "rank": 1541,
      "count": 88
    },
    {
      "name": "PolkaBridge",
      "code": "PBR",
      "rank": 1553,
      "count": 89
    },
    {
      "name": "Bridge Oracle",
      "code": "BRG",
      "rank": 1567,
      "count": 90
    },
    {
      "name": "Victoria VR",
      "code": "VR",
      "rank": 1572,
      "count": 91
    },
    {
      "name": "Cirus",
      "code": "CIRUS",
      "rank": 1616,
      "count": 92
    },
    {
      "name": "Ozone Chain",
      "code": "OZO",
      "rank": 1628,
      "count": 93
    },
    {
      "name": "Trava Finance",
      "code": "TRAVA",
      "rank": 1653,
      "count": 94
    },
    {
      "name": "SIDUS Heroes",
      "code": "SIDUS",
      "rank": 1685,
      "count": 95
    },
    {
      "name": "HackenAI",
      "code": "HAI",
      "rank": 1696,
      "count": 96
    },
    {
      "name": "Omax Coin",
      "code": "OMAX",
      "rank": 1697,
      "count": 97
    },
    {
      "name": "Openfabric",
      "code": "OFN",
      "rank": 1715,
      "count": 98
    },
    {
      "name": "Synesis One",
      "code": "SNS",
      "rank": 1738,
      "count": 99
    },
    {
      "name": "Chirpley",
      "code": "CHRP",
      "rank": 1781,
      "count": 100
    },
    {
      "name": "DTravel",
      "code": "TRVL",
      "rank": 1808,
      "count": 101
    },
    {
      "name": "HashAI",
      "code": "HASHAI",
      "rank": 1810,
      "count": 102
    },
    {
      "name": "Inspect",
      "code": "INSP",
      "rank": 1850,
      "count": 103
    },
    {
      "name": "Multiverse",
      "code": "AI",
      "rank": 1909,
      "count": 104
    },
    {
      "name": "Swash Token",
      "code": "SWASH",
      "rank": 1924,
      "count": 105
    },
    {
      "name": "Gaimin Token",
      "code": "GMRX",
      "rank": 2021,
      "count": 106
    },
    {
      "name": "Nuco.cloud",
      "code": "NCDT",
      "rank": 2024,
      "count": 107
    },
    {
      "name": "Aventis Metaverse",
      "code": "AVTM",
      "rank": 2104,
      "count": 108
    },
    {
      "name": "All In",
      "code": "ALLIN",
      "rank": 2213,
      "count": 109
    },
    {
      "name": "Altered State Token",
      "code": "ASTO",
      "rank": 2219,
      "count": 110
    },
    {
      "name": "Virtual Protocol",
      "code": "VIRTUAL",
      "rank": 2266,
      "count": 111
    },
    {
      "name": "dKargo",
      "code": "DKA",
      "rank": 2285,
      "count": 112
    },
    {
      "name": "Sai",
      "code": "SAI",
      "rank": 2301,
      "count": 113
    },
    {
      "name": "bitsCrunch Token",
      "code": "BCUT",
      "rank": 2348,
      "count": 114
    },
    {
      "name": "WAM",
      "code": "WAM",
      "rank": 2443,
      "count": 115
    },
    {
      "name": "Y8U.AI",
      "code": "Y8U",
      "rank": 2565,
      "count": 116
    },
    {
      "name": "MetamonkeyAi",
      "code": "MMAI",
      "rank": 2578,
      "count": 117
    },
    {
      "name": "EpiK Protocol",
      "code": "AIEPK",
      "rank": 2580,
      "count": 118
    },
    {
      "name": "Cogito Governance Token",
      "code": "CGV",
      "rank": 2648,
      "count": 119
    },
    {
      "name": "Agoras: Currency of Tau",
      "code": "AGRS",
      "rank": 2827,
      "count": 120
    },
    {
      "name": "NetVRk v2",
      "code": "NETVR",
      "rank": 2850,
      "count": 121
    },
    {
      "name": "Image Generation AI | imgnAI.com",
      "code": "IMGNAI",
      "rank": 2853,
      "count": 122
    },
    {
      "name": "Pawtocol",
      "code": "UPI",
      "rank": 2927,
      "count": 123
    },
    {
      "name": "Nunet",
      "code": "NTX",
      "rank": 2959,
      "count": 124
    },
    {
      "name": "SENATE DAO",
      "code": "SENATE",
      "rank": 2987,
      "count": 125
    },
    {
      "name": "The Winkyverse",
      "code": "WNK",
      "rank": 3131,
      "count": 126
    },
    {
      "name": "Lavita",
      "code": "LAVITA",
      "rank": 3155,
      "count": 127
    },
    {
      "name": "DxChain Token",
      "code": "DX",
      "rank": 3202,
      "count": 128
    },
    {
      "name": "PureFi",
      "code": "UFI",
      "rank": 3213,
      "count": 129
    },
    {
      "name": "Botto",
      "code": "BOTTO",
      "rank": 3245,
      "count": 130
    },
    {
      "name": "Bottos",
      "code": "BTO",
      "rank": 3299,
      "count": 131
    },
    {
      "name": "AimBot",
      "code": "AIMBOT",
      "rank": 3356,
      "count": 132
    },
    {
      "name": "Axis DeFi",
      "code": "AXIS",
      "rank": 3426,
      "count": 133
    },
    {
      "name": "Data Highway",
      "code": "DHX",
      "rank": 3800,
      "count": 134
    },
    {
      "name": "Hero Arena",
      "code": "HERA",
      "rank": 3945,
      "count": 135
    },
    {
      "name": "ApeBond",
      "code": "ABOND",
      "rank": 4115,
      "count": 136
    },
    {
      "name": "BullBear AI",
      "code": "AIBB",
      "rank": 4218,
      "count": 137
    },
    {
      "name": "ROKO",
      "code": "ROKO",
      "rank": 4264,
      "count": 138
    },
    {
      "name": "PaladinAI",
      "code": "PALAI",
      "rank": 4268,
      "count": 139
    },
    {
      "name": "Catheon Gaming",
      "code": "CATHEON",
      "rank": 4296,
      "count": 140
    },
    {
      "name": "Trace Network Labs",
      "code": "TRACE",
      "rank": 4415,
      "count": 141
    },
    {
      "name": "AICHAIN",
      "code": "AIT",
      "rank": 4549,
      "count": 142
    },
    {
      "name": "Human Protocol",
      "code": "HMT",
      "rank": 4722,
      "count": 143
    },
    {
      "name": "Arbius",
      "code": "AIUS",
      "rank": 4852,
      "count": 144
    },
    {
      "name": "Liza",
      "code": "LIZA",
      "rank": 4947,
      "count": 145
    },
    {
      "name": "DeepFakeAI",
      "code": "FAKEAI",
      "rank": 4960,
      "count": 146
    },
    {
      "name": "AlphaScan",
      "code": "ASCN",
      "rank": 5057,
      "count": 147
    },
    {
      "name": "OceanEx Token",
      "code": "OCE",
      "rank": 5074,
      "count": 148
    },
    {
      "name": "Viridis Network",
      "code": "VRD",
      "rank": 5114,
      "count": 149
    },
    {
      "name": "FOAM",
      "code": "FOAM",
      "rank": 5133,
      "count": 150
    },
    {
      "name": "2DAI.io",
      "code": "2DAI",
      "rank": 5309,
      "count": 151
    },
    {
      "name": "Arcona",
      "code": "ARCONA",
      "rank": 5346,
      "count": 152
    },
    {
      "name": "AlphaKEK.AI",
      "code": "AIKEK",
      "rank": 5359,
      "count": 153
    },
    {
      "name": "Neurashi",
      "code": "NEI",
      "rank": 5398,
      "count": 154
    },
    {
      "name": "AITK",
      "code": "AITK",
      "rank": 5418,
      "count": 155
    },
    {
      "name": "MOROS NET",
      "code": "MOROS",
      "rank": 5494,
      "count": 156
    },
    {
      "name": "Inheritance Art",
      "code": "IAI",
      "rank": 5576,
      "count": 157
    },
    {
      "name": "b-cube.ai",
      "code": "BCUBE",
      "rank": 5855,
      "count": 158
    },
    {
      "name": "Evai",
      "code": "EV",
      "rank": 6289,
      "count": 159
    },
    {
      "name": "Kambria",
      "code": "KAT",
      "rank": 6319,
      "count": 160
    },
    {
      "name": "VuzzMind",
      "code": "VUZZ",
      "rank": 6341,
      "count": 161
    },
    {
      "name": "Ojamu",
      "code": "OJA",
      "rank": 6396,
      "count": 162
    },
    {
      "name": "Neuroni.AI",
      "code": "NEURONI",
      "rank": 6595,
      "count": 163
    },
    {
      "name": "Aion",
      "code": "AION",
      "rank": 6635,
      "count": 164
    },
    {
      "name": "Acria Token",
      "code": "ACRIA",
      "rank": 6779,
      "count": 165
    },
    {
      "name": "Metoshi",
      "code": "METO",
      "rank": 6789,
      "count": 166
    },
    {
      "name": "LikeCoin",
      "code": "LIKE",
      "rank": 6842,
      "count": 167
    },
    {
      "name": "Ushi",
      "code": "USHI",
      "rank": 6967,
      "count": 168
    },
    {
      "name": "Gem AI",
      "code": "GEMAI",
      "rank": 7014,
      "count": 169
    },
    {
      "name": "Cindicator",
      "code": "CND",
      "rank": 7070,
      "count": 170
    },
    {
      "name": "BurnifyAI",
      "code": "BURNIFYAI",
      "rank": 7174,
      "count": 171
    },
    {
      "name": "UTU Coin",
      "code": "UTU",
      "rank": 7404,
      "count": 172
    },
    {
      "name": "VirtuSwap",
      "code": "VRSW",
      "rank": 7654,
      "count": 173
    },
    {
      "name": "AiONE",
      "code": "AIONE",
      "rank": 7898,
      "count": 174
    },
    {
      "name": "Trolite",
      "code": "TRL",
      "rank": 8146,
      "count": 175
    },
    {
      "name": "Mandala Exchange Token",
      "code": "MDX",
      "rank": 8338,
      "count": 176
    },
    {
      "name": "Grok",
      "code": "GROK",
      "rank": 8603,
      "count": 177
    },
    {
      "name": "LNDRY",
      "code": "LNDRY",
      "rank": 8781,
      "count": 178
    },
    {
      "name": "MBD Financials",
      "code": "MBD",
      "rank": 9010,
      "count": 179
    },
    {
      "name": "IO",
      "code": "IO",
      "rank": 9221,
      "count": 180
    },
    {
      "name": "McPepes",
      "code": "PEPES",
      "rank": 9237,
      "count": 181
    },
    {
      "name": "MarketMove",
      "code": "MOVE",
      "rank": 9803,
      "count": 182
    },
    {
      "name": "Relevant",
      "code": "REL",
      "rank": 9862,
      "count": 183
    },
    {
      "name": "Datamine FLUX",
      "code": "FLUX",
      "rank": 10176,
      "count": 184
    },
    {
      "name": "EncrypGen",
      "code": "DNA",
      "rank": 10233,
      "count": 185
    },
    {
      "name": "Neuralink Protocol",
      "code": "NEURA",
      "rank": 10503,
      "count": 186
    },
    {
      "name": "AI Doctor",
      "code": "AIDOC",
      "rank": 11353,
      "count": 187
    },
    {
      "name": "ASI finance",
      "code": "ASI",
      "rank": 11563,
      "count": 188
    },
    {
      "name": "AdHive",
      "code": "ADH",
      "rank": 11686,
      "count": 189
    },
    {
      "name": "Agrello",
      "code": "DLT",
      "rank": 11773,
      "count": 190
    },
    {
      "name": "AiLink",
      "code": "ALI",
      "rank": 11796,
      "count": 191
    },
    {
      "name": "Aimedis v1",
      "code": "AIMX",
      "rank": 11811,
      "count": 192
    },
    {
      "name": "Ainori",
      "code": "AIN",
      "rank": 11815,
      "count": 193
    },
    {
      "name": "Anchor Neural World",
      "code": "ANW",
      "rank": 12079,
      "count": 194
    },
    {
      "name": "Apeiron",
      "code": "APRS",
      "rank": 12221,
      "count": 195
    },
    {
      "name": "Astra",
      "code": "ASTRA",
      "rank": 12477,
      "count": 196
    },
    {
      "name": "Atheios",
      "code": "ATH",
      "rank": 12533,
      "count": 197
    },
    {
      "name": "AurumCoin",
      "code": "AU",
      "rank": 12604,
      "count": 198
    },
    {
      "name": "BABY ANGEL DUST",
      "code": "BAD",
      "rank": 12727,
      "count": 199
    },
    {
      "name": "BAI Stablecoin",
      "code": "BAI",
      "rank": 12782,
      "count": 200
    },
    {
      "name": "BUILD Finance",
      "code": "BUILD",
      "rank": 13203,
      "count": 201
    },
    {
      "name": "BabyCat Inu",
      "code": "BCAT",
      "rank": 13479,
      "count": 202
    },
    {
      "name": "BidiPass",
      "code": "BDP",
      "rank": 13981,
      "count": 203
    },
    {
      "name": "BitClave",
      "code": "CAT",
      "rank": 14126,
      "count": 204
    },
    {
      "name": "Capricoin",
      "code": "CPC",
      "rank": 15478,
      "count": 205
    },
    {
      "name": "Chainswap",
      "code": "TOKEN",
      "rank": 15721,
      "count": 206
    },
    {
      "name": "ChatCoin",
      "code": "CHAT",
      "rank": 15760,
      "count": 207
    },
    {
      "name": "Cipher Protocol",
      "code": "CIPHER",
      "rank": 15924,
      "count": 208
    },
    {
      "name": "Cloudbric",
      "code": "CLBK",
      "rank": 16007,
      "count": 209
    },
    {
      "name": "CryptoAirlines",
      "code": "CAIR",
      "rank": 16624,
      "count": 210
    },
    {
      "name": "CryptoPing",
      "code": "PING",
      "rank": 16687,
      "count": 211
    },
    {
      "name": "Cryptoindex.com 100",
      "code": "CIX100",
      "rank": 16733,
      "count": 212
    },
    {
      "name": "DATx",
      "code": "DATX",
      "rank": 16923,
      "count": 213
    },
    {
      "name": "Datum",
      "code": "DAT",
      "rank": 17307,
      "count": 214
    },
    {
      "name": "Davinci Coin",
      "code": "DAC",
      "rank": 17313,
      "count": 215
    },
    {
      "name": "De Layer",
      "code": "DEAI",
      "rank": 17326,
      "count": 216
    },
    {
      "name": "Deflect Harbor AI",
      "code": "DEFLECT",
      "rank": 17487,
      "count": 217
    },
    {
      "name": "Doc.com",
      "code": "MTC",
      "rank": 17814,
      "count": 218
    },
    {
      "name": "Duel Network",
      "code": "DUEL",
      "rank": 18316,
      "count": 219
    },
    {
      "name": "Effect.AI",
      "code": "EFX",
      "rank": 18661,
      "count": 220
    },
    {
      "name": "Elamachain (ELA Coin)",
      "code": "ELAMA",
      "rank": 18691,
      "count": 221
    },
    {
      "name": "Emercoin",
      "code": "EMC",
      "rank": 18843,
      "count": 222
    },
    {
      "name": "FABcoin",
      "code": "FAB",
      "rank": 19208,
      "count": 223
    },
    {
      "name": "Fortress DAO",
      "code": "FORT",
      "rank": 20008,
      "count": 224
    },
    {
      "name": "GEMINI PRO",
      "code": "GEMINI",
      "rank": 20260,
      "count": 225
    },
    {
      "name": "GNY",
      "code": "GNY",
      "rank": 20323,
      "count": 226
    },
    {
      "name": "GPT Chain",
      "code": "GPT",
      "rank": 20370,
      "count": 227
    },
    {
      "name": "GPU Coin",
      "code": "GPU",
      "rank": 20373,
      "count": 228
    },
    {
      "name": "GoCrypto",
      "code": "GOC",
      "rank": 20813,
      "count": 229
    },
    {
      "name": "Growing.fi",
      "code": "GROW",
      "rank": 21178,
      "count": 230
    },
    {
      "name": "HEART",
      "code": "HEART",
      "rank": 21276,
      "count": 231
    },
    {
      "name": "Havy",
      "code": "HAVY",
      "rank": 21575,
      "count": 232
    },
    {
      "name": "Idena",
      "code": "IDNA",
      "rank": 22151,
      "count": 233
    },
    {
      "name": "Insights Network v1",
      "code": "INSTAR",
      "rank": 22300,
      "count": 234
    },
    {
      "name": "Jarvis+",
      "code": "JAR",
      "rank": 22537,
      "count": 235
    },
    {
      "name": "Kanpeki",
      "code": "KAE",
      "rank": 22871,
      "count": 236
    },
    {
      "name": "Kwai",
      "code": "KWAI",
      "rank": 23270,
      "count": 237
    },
    {
      "name": "LaikaDog",
      "code": "LAI",
      "rank": 23465,
      "count": 238
    },
    {
      "name": "LeadCoin",
      "code": "LDC",
      "rank": 23531,
      "count": 239
    },
    {
      "name": "Lisk Machine Learning",
      "code": "LML",
      "rank": 23740,
      "count": 240
    },
    {
      "name": "Lith Token",
      "code": "LITH",
      "rank": 23757,
      "count": 241
    },
    {
      "name": "Lushcoin",
      "code": "LUSH",
      "rank": 24007,
      "count": 242
    },
    {
      "name": "Membrana",
      "code": "MBN",
      "rank": 24780,
      "count": 243
    },
    {
      "name": "Metaverse Face",
      "code": "MEFA",
      "rank": 25186,
      "count": 244
    },
    {
      "name": "Midway AI",
      "code": "MIDAI",
      "rank": 25274,
      "count": 245
    },
    {
      "name": "MindCoin",
      "code": "MND",
      "rank": 25321,
      "count": 246
    },
    {
      "name": "Mindsync",
      "code": "MAI",
      "rank": 25329,
      "count": 247
    },
    {
      "name": "MineBee",
      "code": "MB",
      "rank": 25332,
      "count": 248
    },
    {
      "name": "Mozik",
      "code": "MOZ",
      "rank": 25856,
      "count": 249
    },
    {
      "name": "NEURAL",
      "code": "NEURAL",
      "rank": 26143,
      "count": 250
    },
    {
      "name": "Naviaddress",
      "code": "NAVI",
      "rank": 26356,
      "count": 251
    },
    {
      "name": "Neurotoken",
      "code": "NTK",
      "rank": 26461,
      "count": 252
    },
    {
      "name": "New Frontier Presents",
      "code": "NFP",
      "rank": 26481,
      "count": 253
    },
    {
      "name": "Nitrous Finance",
      "code": "NOS",
      "rank": 26598,
      "count": 254
    },
    {
      "name": "NobrainerFinance",
      "code": "BRAIN",
      "rank": 26631,
      "count": 255
    },
    {
      "name": "NovaDeFi",
      "code": "NMT",
      "rank": 26687,
      "count": 256
    },
    {
      "name": "Oort Token",
      "code": "OORT",
      "rank": 27074,
      "count": 257
    },
    {
      "name": "OptiToken",
      "code": "OPTI",
      "rank": 27113,
      "count": 258
    },
    {
      "name": "PAAL AI v1",
      "code": "PAAL",
      "rank": 27282,
      "count": 259
    },
    {
      "name": "PALM",
      "code": "PALM",
      "rank": 27292,
      "count": 260
    },
    {
      "name": "Parrot USD",
      "code": "PAI",
      "rank": 27735,
      "count": 261
    },
    {
      "name": "Pibble",
      "code": "PIB",
      "rank": 28175,
      "count": 262
    },
    {
      "name": "PrimeDAO",
      "code": "PRIME",
      "rank": 28723,
      "count": 263
    },
    {
      "name": "ProChain",
      "code": "PRA",
      "rank": 28754,
      "count": 264
    },
    {
      "name": "Quadency",
      "code": "QUAD",
      "rank": 29021,
      "count": 265
    },
    {
      "name": "Qubitica",
      "code": "QBIT",
      "rank": 29052,
      "count": 266
    },
    {
      "name": "SURETY",
      "code": "SURE",
      "rank": 30455,
      "count": 267
    },
    {
      "name": "ScorpionDao",
      "code": "SDAO",
      "rank": 30842,
      "count": 268
    },
    {
      "name": "Seele",
      "code": "SEELE",
      "rank": 30926,
      "count": 269
    },
    {
      "name": "Silverway",
      "code": "SLV",
      "rank": 31501,
      "count": 270
    },
    {
      "name": "SingularityNET",
      "code": "AGI",
      "rank": 31541,
      "count": 271
    },
    {
      "name": "SophiaTX",
      "code": "SPHTX",
      "rank": 31934,
      "count": 272
    },
    {
      "name": "Spectre Protocol",
      "code": "SPECTRE",
      "rank": 32051,
      "count": 273
    },
    {
      "name": "TAO token",
      "code": "TAO",
      "rank": 32704,
      "count": 274
    },
    {
      "name": "Teslafan",
      "code": "TESLF",
      "rank": 33091,
      "count": 275
    },
    {
      "name": "The Employment Commons Work Token",
      "code": "WORK",
      "rank": 33173,
      "count": 276
    },
    {
      "name": "The Oracle",
      "code": "ORACLE",
      "rank": 33246,
      "count": 277
    },
    {
      "name": "TheADA",
      "code": "TADA",
      "rank": 33337,
      "count": 278
    },
    {
      "name": "Ties.DB",
      "code": "TIE",
      "rank": 33428,
      "count": 279
    },
    {
      "name": "ToTheMoon",
      "code": "TTM",
      "rank": 33510,
      "count": 280
    },
    {
      "name": "Torex",
      "code": "TOR",
      "rank": 33625,
      "count": 281
    },
    {
      "name": "Triveum",
      "code": "TRV",
      "rank": 33817,
      "count": 282
    },
    {
      "name": "Turbo Wallet",
      "code": "TURBO",
      "rank": 33921,
      "count": 283
    },
    {
      "name": "Typerium",
      "code": "TYPE",
      "rank": 33993,
      "count": 284
    },
    {
      "name": "Ubex",
      "code": "UBEX",
      "rank": 34116,
      "count": 285
    },
    {
      "name": "Viacoin",
      "code": "VIA",
      "rank": 34591,
      "count": 286
    },
    {
      "name": "Voltage",
      "code": "VOLT",
      "rank": 34702,
      "count": 287
    },
    {
      "name": "Web AI",
      "code": "WEBAI",
      "rank": 35012,
      "count": 288
    },
    {
      "name": "Xeta Reality",
      "code": "XETA",
      "rank": 35644,
      "count": 289
    }
  ]

export const cryptoCodes1 = [
    "NEAR",
    "FET",
    "RNDR",
    "INJ",
    "GRT",
    "THETA",
    "AKT",
    "AIOZ",
    "ROSE",
    "TFUEL",
    "AGIX",
    "CORGIAI",
    "TRAC",
    "GLM",
    "OCEAN",
    "ABT",
    "QUBIC",
    "POND",
    "KDA",
    "RLC",
    "PHA",
    "ORAI",
    "IQ",
    "NMR",
    "CUDOS",
    "ALEPH",
    "OLAS",
    "LAT",
    "CTXC",
    "VRA",
    "CQT",
    "VAI",
    "KEY",
    "MDT",
    "TRIAS",
    "UPP",
    "GLQ",
    "PRQ",
    "VXV",
    "LAMB",
    "ZCN",
    "MAN",
    "DIA",
    "DERI",
    "DOCK",
    "ISP",
    "DBC",
    "SAN",
    "XRT",
    "PRE",
    "MARSH",
    "LMR",
    "CTI",
    "LSS",
    "RAVEN",
    "MOOV",
    "AIRI",
    "UNO",
    "BIRD",
    "VRX",
    "RING",
    "ROOBEE",
    "XMON",
    "LBC",
    "DDD",
    "RAZE",
    "SOUL",
    "ARKM",
    "PHB",
    "AITECH",
    "GTAI",
    "OOKI",
    "CGPT",
    "FITFI",
    "ZIG",
    "LMWR",
    "DATA",
    "DMTR",
    "DKS",
    "RSS3",
    "HOOK",
    "LIME",
    "HGPT",
    "NUM",
    "VIDT",
    "AIPAD",
    "CERE",
    "DCK",
    "PBR",
    "BRG",
    "VR",
    "CIRUS",
    "OZO",
    "TRAVA",
    "SIDUS",
    "OMAX",
    "HAI",
    "OFN",
    "SNS",
    "CHRP",
    "HASHAI",
    "TRVL",
    "INSP",
    "AI",
    "SWASH",
    "GMRX",
    "NCDT",
    "AVTM",
    "ALLIN",
    "ASTO",
    "VIRTUAL",
    "DKA",
    "SAI",
    "BCUT",
    "WAM",
    "Y8U",
    "AIEPK",
    "MMAI",
    "CGV",
    "AGRS",
    "NETVR",
    "IMGNAI",
    "UPI",
    "NTX",
    "SENATE",
    "LAVITA",
    "WNK",
    "DX",
    "UFI",
    "BOTTO",
    "BTO",
    "AIMBOT",
    "AXIS",
    "DHX",
    "HERA",
    "ABOND",
    "AIBB",
    "ROKO",
    "PALAI",
    "CATHEON",
    "TRACE",
    "AIT",
    "HMT",
    "AIUS",
    "LIZA",
    "FAKEAI",
    "ASCN",
    "OCE",
    "VRD",
    "FOAM",
    "2DAI",
    "ARCONA",
    "AIKEK",
    "NEI",
    "MOROS",
    "IAI",
    "BCUBE",
    "AITK",
    "EV",
    "KAT",
    "VUZZ",
    "OJA",
    "NEURONI",
    "AION",
    "ACRIA",
    "METO",
    "LIKE",
    "USHI",
    "GEMAI",
    "CND",
    "BURNIFYAI",
    "UTU",
    "VRSW",
    "AIONE",
    "TRL",
    "MDX",
    "GROK",
    "LNDRY",
    "MBD",
    "IO",
    "PEPES",
    "MOVE",
    "REL",
    "FLUX",
    "DNA",
    "NEURA",
    "AIDOC",
    "ASI",
    "ADH",
    "DLT",
    "ALI",
    "AIMX",
    "AIN",
    "ANW",
    "APRS",
    "ASTRA",
    "ATH",
    "AU",
    "BAD",
    "BAI",
    "BUILD",
    "BCAT",
    "BDP",
    "CAT",
    "CPC",
    "TOKEN",
    "CHAT",
    "CIPHER",
    "CLBK",
    "CAIR",
    "PING",
    "CIX100",
    "DATX",
    "DAT",
    "DAC",
    "DEAI",
    "DEFLECT",
    "MTC",
    "DUEL",
    "EFX",
    "ELAMA",
    "EMC",
    "FAB",
    "FORT",
    "GEMINI",
    "GNY",
    "GPT",
    "GPU",
    "GOC",
    "GROW",
    "HEART",
    "HAVY",
    "IDNA",
    "INSTAR",
    "JAR",
    "KAE",
    "KWAI",
    "LAI",
    "LDC",
    "LML",
    "LITH",
    "LUSH",
    "MBN",
    "MEFA",
    "MIDAI",
    "MND",
    "MAI",
    "MB",
    "MOZ",
    "NEURAL",
    "NAVI",
    "NTK",
    "NFP",
    "NOS",
    "BRAIN",
    "NMT",
    "OORT",
    "OPTI",
    "PAAL",
    "PALM",
    "PAI",
    "PIB",
    "PRIME",
    "PRA",
    "QUAD",
    "QBIT",
    "SURE",
    "SDAO",
    "SEELE",
    "SLV",
    "AGI",
    "SPHTX",
    "SPECTRE",
    "TAO",
    "TESLF",
    "WORK",
    "ORACLE",
    "TADA",
    "TIE",
    "TTM",
    "TOR",
    "TRV",
    "TURBO",
    "TYPE",
    "UBEX",
    "VIA",
    "VOLT",
    "WEBAI",
    "XETA"
  ]

export const cryptoCountObj = {
  'NEAR': 1,
  'FET': 2,
  'RNDR': 3,
  'INJ': 4,
  'GRT': 5,
  'THETA': 6,
  'AKT': 7,
  'AIOZ': 8,
  'ROSE': 9,
  'TFUEL': 10,
  'AGIX': 11,
  'CORGIAI': 12,
  'TRAC': 13,
  'GLM': 14,
  'OCEAN': 15,
  'ABT': 16,
  'QUBIC': 17,
  'POND': 18,
  'KDA': 19,
  'RLC': 20,
  'PHA': 21,
  'ORAI': 22,
  'IQ': 23,
  'NMR': 24,
  'CUDOS': 25,
  'ALEPH': 26,
  'OLAS': 27,
  'LAT': 28,
  'CTXC': 29,
  'VRA': 30,
  'CQT': 31,
  'VAI': 32,
  'KEY': 33,
  'MDT': 34,
  'TRIAS': 35,
  'UPP': 36,
  'GLQ': 37,
  'PRQ': 38,
  'VXV': 39,
  'LAMB': 40,
  'ZCN': 41,
  'MAN': 42,
  'DIA': 43,
  'DERI': 44,
  'DOCK': 45,
  'ISP': 46,
  'DBC': 47,
  'SAN': 48,
  'XRT': 49,
  'PRE': 50,
  'MARSH': 51,
  'LMR': 52,
  'CTI': 53,
  'LSS': 54,
  'RAVEN': 55,
  'MOOV': 56,
  'AIRI': 57,
  'UNO': 58,
  'BIRD': 59,
  'VRX': 60,
  'RING': 61,
  'ROOBEE': 62,
  'XMON': 63,
  'LBC': 64,
  'DDD': 65,
  'RAZE': 66,
  'SOUL': 67,
  'ARKM': 68,
  'PHB': 69,
  'AITECH': 70,
  'GTAI': 71,
  'OOKI': 72,
  'CGPT': 73,
  'FITFI': 74,
  'ZIG': 75,
  'LMWR': 76,
  'DATA': 77,
  'DMTR': 78,
  'DKS': 79,
  'RSS3': 80,
  'HOOK': 81,
  'LIME': 82,
  'HGPT': 83,
  'NUM': 84,
  'VIDT': 85,
  'AIPAD': 86,
  'CERE': 87,
  'DCK': 88,
  'PBR': 89,
  'BRG': 90,
  'VR': 91,
  'CIRUS': 92,
  'OZO': 93,
  'TRAVA': 94,
  'SIDUS': 95,
  'OMAX': 96,
  'HAI': 97,
  'OFN': 98,
  'SNS': 99,
  'CHRP': 100,
  'HASHAI': 101,
  'TRVL': 102,
  'INSP': 103,
  'AI': 104,
  'SWASH': 105,
  'GMRX': 106,
  'NCDT': 107,
  'AVTM': 108,
  'ALLIN': 109,
  'ASTO': 110,
  'VIRTUAL': 111,
  'DKA': 112,
  'SAI': 113,
  'BCUT': 114,
  'WAM': 115,
  'Y8U': 116,
  'AIEPK': 117,
  'MMAI': 118,
  'CGV': 119,
  'AGRS': 120,
  'NETVR': 121,
  'IMGNAI': 122,
  'UPI': 123,
  'NTX': 124,
  'SENATE': 125,
  'LAVITA': 126,
  'WNK': 127,
  'DX': 128,
  'UFI': 129,
  'BOTTO': 130,
  'BTO': 131,
  'AIMBOT': 132,
  'AXIS': 133,
  'DHX': 134,
  'HERA': 135,
  'ABOND': 136,
  'AIBB': 137,
  'ROKO': 138,
  'PALAI': 139,
  'CATHEON': 140,
  'TRACE': 141,
  'AIT': 142,
  'HMT': 143,
  'AIUS': 144,
  'LIZA': 145,
  'FAKEAI': 146,
  'ASCN': 147,
  'OCE': 148,
  'VRD': 149,
  'FOAM': 150,
  '2DAI': 151,
  'ARCONA': 152,
  'AIKEK': 153,
  'NEI': 154,
  'MOROS': 155,
  'IAI': 156,
  'BCUBE': 157,
  'AITK': 158,
  'EV': 159,
  'KAT': 160,
  'VUZZ': 161,
  'OJA': 162,
  'NEURONI': 163,
  'AION': 164,
  'ACRIA': 165,
  'METO': 166,
  'LIKE': 167,
  'USHI': 168,
  'GEMAI': 169,
  'CND': 170,
  'BURNIFYAI': 171,
  'UTU': 172,
  'VRSW': 173,
  'AIONE': 174,
  'TRL': 175,
  'MDX': 176,
  'GROK': 177,
  'LNDRY': 178,
  'MBD': 179,
  'IO': 180,
  'PEPES': 181,
  'MOVE': 182,
  'REL': 183,
  'FLUX': 184,
  'DNA': 185,
  'NEURA': 186,
  'AIDOC': 187,
  'ASI': 188,
  'ADH': 189,
  'DLT': 190,
  'ALI': 191,
  'AIMX': 192,
  'AIN': 193,
  'ANW': 194,
  'APRS': 195,
  'ASTRA': 196,
  'ATH': 197,
  'AU': 198,
  'BAD': 199,
  'BAI': 200,
  'BUILD': 201,
  'BCAT': 202,
  'BDP': 203,
  'CAT': 204,
  'CPC': 205,
  'TOKEN': 206,
  'CHAT': 207,
  'CIPHER': 208,
  'CLBK': 209,
  'CAIR': 210,
  'PING': 211,
  'CIX100': 212,
  'DATX': 213,
  'DAT': 214,
  'DAC': 215,
  'DEAI': 216,
  'DEFLECT': 217,
  'MTC': 218,
  'DUEL': 219,
  'EFX': 220,
  'ELAMA': 221,
  'EMC': 222,
  'FAB': 223,
  'FORT': 224,
  'GEMINI': 225,
  'GNY': 226,
  'GPT': 227,
  'GPU': 228,
  'GOC': 229,
  'GROW': 230,
  'HEART': 231,
  'HAVY': 232,
  'IDNA': 233,
  'INSTAR': 234,
  'JAR': 235,
  'KAE': 236,
  'KWAI': 237,
  'LAI': 238,
  'LDC': 239,
  'LML': 240,
  'LITH': 241,
  'LUSH': 242,
  'MBN': 243,
  'MEFA': 244,
  'MIDAI': 245,
  'MND': 246,
  'MAI': 247,
  'MB': 248,
  'MOZ': 249,
  'NEURAL': 250,
  'NAVI': 251,
  'NTK': 252,
  'NFP': 253,
  'NOS': 254,
  'BRAIN': 255,
  'NMT': 256,
  'OORT': 257,
  'OPTI': 258,
  'PAAL': 259,
  'PALM': 260,
  'PAI': 261,
  'PIB': 262,
  'PRIME': 263,
  'PRA': 264,
  'QUAD': 265,
  'QBIT': 266,
  'SURE': 267,
  'SDAO': 268,
  'SEELE': 269,
  'SLV': 270,
  'AGI': 271,
  'SPHTX': 272,
  'SPECTRE': 273,
  'TAO': 274,
  'TESLF': 275,
  'WORK': 276,
  'ORACLE': 277,
  'TADA': 278,
  'TIE': 279,
  'TTM': 280,
  'TOR': 281,
  'TRV': 282,
  'TURBO': 283,
  'TYPE': 284,
  'UBEX': 285,
  'VIA': 286,
  'VOLT': 287,
  'WEBAI': 288,
  'XETA': 289}