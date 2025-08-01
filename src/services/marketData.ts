// Market Data Types
export interface JobTrend {
  id: string;
  title: string;
  category: string;
  growth: number;
  demand: number;
  salary: {
    min: number;
    max: number;
    median: number;
  };
  skills: string[];
  location: string;
  postedDate: string;
  company: string;
}

export interface SalaryData {
  skill: string;
  experience: string;
  location: string;
  salary: {
    min: number;
    max: number;
    median: number;
    percentiles: {
      p25: number;
      p50: number;
      p75: number;
      p90: number;
    };
  };
  demand: number;
  growth: number;
  lastUpdated: string;
}

export interface SkillDemand {
  skill: string;
  category: string;
  demand: number;
  growth: number;
  marketValue: number;
  jobCount: number;
  averageSalary: number;
  topCompanies: string[];
  trending: boolean;
  lastUpdated: string;
}

export interface MarketInsights {
  topSkills: SkillDemand[];
  trendingJobs: JobTrend[];
  salaryInsights: SalaryData[];
  marketOverview: {
    totalJobs: number;
    averageSalary: number;
    growthRate: number;
    topCategories: string[];
  };
}

// Market Data Service
export const marketService = {
  // Get real-time job market trends
  getJobTrends: async (): Promise<JobTrend[]> => {
    // Use mock data instead of trying to connect to non-existent backend
    return [
      {
        id: '1',
        title: 'Senior React Developer',
        category: 'Frontend Development',
        growth: 15.2,
        demand: 92,
        salary: { min: 80000, max: 150000, median: 115000 },
        skills: ['React', 'TypeScript', 'Node.js'],
        location: 'San Francisco, CA',
        postedDate: '2024-01-15',
        company: 'TechCorp'
      },
      {
        id: '2',
        title: 'Full Stack Engineer',
        category: 'Full Stack Development',
        growth: 12.8,
        demand: 88,
        salary: { min: 90000, max: 160000, median: 125000 },
        skills: ['React', 'Node.js', 'Python', 'AWS'],
        location: 'New York, NY',
        postedDate: '2024-01-14',
        company: 'InnovateTech'
      },
      {
        id: '3',
        title: 'AI/ML Engineer',
        category: 'Artificial Intelligence',
        growth: 25.5,
        demand: 95,
        salary: { min: 100000, max: 180000, median: 140000 },
        skills: ['Python', 'TensorFlow', 'PyTorch', 'AWS'],
        location: 'Seattle, WA',
        postedDate: '2024-01-13',
        company: 'DataFlow Inc'
      },
      {
        id: '4',
        title: 'DevOps Engineer',
        category: 'DevOps',
        growth: 18.3,
        demand: 85,
        salary: { min: 85000, max: 140000, median: 110000 },
        skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
        location: 'Austin, TX',
        postedDate: '2024-01-12',
        company: 'CloudTech Solutions'
      },
      {
        id: '5',
        title: 'Data Scientist',
        category: 'Data Science',
        growth: 22.1,
        demand: 90,
        salary: { min: 95000, max: 160000, median: 125000 },
        skills: ['Python', 'R', 'SQL', 'Machine Learning'],
        location: 'Boston, MA',
        postedDate: '2024-01-11',
        company: 'Analytics Pro'
      }
    ];
  },

  // Get skill demand data
  getSkillDemand: async (): Promise<SkillDemand[]> => {
    // Use mock data instead of trying to connect to non-existent backend
    return [
      {
        skill: 'React',
        category: 'Frontend Development',
        demand: 92,
        growth: 15.2,
        marketValue: 115000,
        jobCount: 15420,
        averageSalary: 115000,
        topCompanies: ['Meta', 'Netflix', 'Airbnb'],
        trending: true,
        lastUpdated: '2024-01-15'
      },
      {
        skill: 'Python',
        category: 'Programming Languages',
        demand: 88,
        growth: 12.8,
        marketValue: 125000,
        jobCount: 18250,
        averageSalary: 125000,
        topCompanies: ['Google', 'Microsoft', 'Amazon'],
        trending: true,
        lastUpdated: '2024-01-15'
      },
      {
        skill: 'AWS',
        category: 'Cloud Computing',
        demand: 85,
        growth: 18.3,
        marketValue: 110000,
        jobCount: 12340,
        averageSalary: 110000,
        topCompanies: ['Amazon', 'Netflix', 'Spotify'],
        trending: true,
        lastUpdated: '2024-01-15'
      },
      {
        skill: 'TypeScript',
        category: 'Programming Languages',
        demand: 78,
        growth: 25.5,
        marketValue: 120000,
        jobCount: 9870,
        averageSalary: 120000,
        topCompanies: ['Microsoft', 'Google', 'Meta'],
        trending: true,
        lastUpdated: '2024-01-15'
      },
      {
        skill: 'Node.js',
        category: 'Backend Development',
        demand: 82,
        growth: 14.7,
        marketValue: 105000,
        jobCount: 11230,
        averageSalary: 105000,
        topCompanies: ['Netflix', 'LinkedIn', 'Uber'],
        trending: false,
        lastUpdated: '2024-01-15'
      }
    ];
  },

  // Get salary data
  getSalaryData: async (): Promise<SalaryData[]> => {
    // Use mock data instead of trying to connect to non-existent backend
    return [
      {
        skill: 'React',
        experience: 'Senior',
        location: 'San Francisco, CA',
        salary: {
          min: 120000,
          max: 180000,
          median: 150000,
          percentiles: {
            p25: 130000,
            p50: 150000,
            p75: 165000,
            p90: 175000
          }
        },
        demand: 92,
        growth: 15.2,
        lastUpdated: '2024-01-15'
      },
      {
        skill: 'Python',
        experience: 'Senior',
        location: 'New York, NY',
        salary: {
          min: 110000,
          max: 170000,
          median: 140000,
          percentiles: {
            p25: 120000,
            p50: 140000,
            p75: 155000,
            p90: 165000
          }
        },
        demand: 88,
        growth: 12.8,
        lastUpdated: '2024-01-15'
      },
      {
        skill: 'AWS',
        experience: 'Mid-level',
        location: 'Seattle, WA',
        salary: {
          min: 90000,
          max: 140000,
          median: 115000,
          percentiles: {
            p25: 100000,
            p50: 115000,
            p75: 125000,
            p90: 135000
          }
        },
        demand: 85,
        growth: 18.3,
        lastUpdated: '2024-01-15'
      },
      {
        skill: 'TypeScript',
        experience: 'Senior',
        location: 'Boston, MA',
        salary: {
          min: 100000,
          max: 160000,
          median: 130000,
          percentiles: {
            p25: 110000,
            p50: 130000,
            p75: 145000,
            p90: 155000
          }
        },
        demand: 78,
        growth: 25.5,
        lastUpdated: '2024-01-15'
      },
      {
        skill: 'Node.js',
        experience: 'Mid-level',
        location: 'Austin, TX',
        salary: {
          min: 80000,
          max: 130000,
          median: 105000,
          percentiles: {
            p25: 90000,
            p50: 105000,
            p75: 115000,
            p90: 125000
          }
        },
        demand: 82,
        growth: 14.7,
        lastUpdated: '2024-01-15'
      }
    ];
  },

  // Get comprehensive market insights
  getMarketInsights: async (): Promise<MarketInsights> => {
    try {
      const [jobTrends, salaryData, skillDemand] = await Promise.all([
        marketService.getJobTrends(),
        marketService.getSalaryData(),
        marketService.getSkillDemand()
      ]);

      return {
        topSkills: skillDemand.slice(0, 10),
        trendingJobs: jobTrends.slice(0, 5),
        salaryInsights: salaryData.slice(0, 8),
        marketOverview: {
          totalJobs: 45620,
          averageSalary: 118000,
          growthRate: 12.5,
          topCategories: ['Frontend Development', 'Backend Development', 'Data Science', 'Cloud & DevOps']
        }
      };
    } catch (error) {
      console.error('Error fetching market insights:', error);
      throw error;
    }
  }
}; 