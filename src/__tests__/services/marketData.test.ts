import { marketService, JobTrend, SalaryData, SkillDemand } from '../../services/marketData';
import { apiClient } from '../../utils/api';

// Mock the API client
jest.mock('../../utils/api', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('Market Data Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getJobTrends', () => {
    it('should fetch job trends successfully', async () => {
      const mockJobTrends: JobTrend[] = [
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
        }
      ];

      mockedApiClient.get.mockResolvedValueOnce({ data: mockJobTrends });

      const result = await marketService.getJobTrends();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/market/job-trends');
      expect(result).toEqual(mockJobTrends);
    });

    it('should return fallback data when API fails', async () => {
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await marketService.getJobTrends();

      expect(result).toHaveLength(3);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('category');
      expect(result[0]).toHaveProperty('growth');
      expect(result[0]).toHaveProperty('demand');
      expect(result[0]).toHaveProperty('salary');
    });
  });

  describe('getSalaryData', () => {
    it('should fetch salary data with filters', async () => {
      const mockSalaryData: SalaryData[] = [
        {
          skill: 'React',
          experience: '3-5 years',
          location: 'San Francisco, CA',
          salary: {
            min: 80000,
            max: 150000,
            median: 115000,
            percentiles: {
              p25: 95000,
              p50: 115000,
              p75: 135000,
              p90: 150000
            }
          },
          demand: 92,
          growth: 15.2,
          lastUpdated: '2024-01-15'
        }
      ];

      mockedApiClient.get.mockResolvedValueOnce({ data: mockSalaryData });

      const result = await marketService.getSalaryData('React', 'San Francisco, CA');

      expect(mockedApiClient.get).toHaveBeenCalledWith('/market/salary-data?skill=React&location=San Francisco, CA');
      expect(result).toEqual(mockSalaryData);
    });

    it('should fetch salary data without filters', async () => {
      const mockSalaryData: SalaryData[] = [];
      mockedApiClient.get.mockResolvedValueOnce({ data: mockSalaryData });

      const result = await marketService.getSalaryData();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/market/salary-data');
      expect(result).toEqual(mockSalaryData);
    });

    it('should return fallback data when API fails', async () => {
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await marketService.getSalaryData();

      expect(result).toHaveLength(3);
      expect(result[0]).toHaveProperty('skill');
      expect(result[0]).toHaveProperty('experience');
      expect(result[0]).toHaveProperty('location');
      expect(result[0]).toHaveProperty('salary');
      expect(result[0].salary).toHaveProperty('min');
      expect(result[0].salary).toHaveProperty('max');
      expect(result[0].salary).toHaveProperty('median');
      expect(result[0].salary).toHaveProperty('percentiles');
    });
  });

  describe('getSkillDemand', () => {
    it('should fetch skill demand data successfully', async () => {
      const mockSkillDemand: SkillDemand[] = [
        {
          skill: 'React',
          category: 'Frontend Development',
          demand: 92,
          growth: 15.2,
          marketValue: 115000,
          jobCount: 15420,
          averageSalary: 115000,
          topCompanies: ['Google', 'Meta', 'Netflix', 'Airbnb'],
          trending: true,
          lastUpdated: '2024-01-15'
        }
      ];

      mockedApiClient.get.mockResolvedValueOnce({ data: mockSkillDemand });

      const result = await marketService.getSkillDemand();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/market/skill-demand');
      expect(result).toEqual(mockSkillDemand);
    });

    it('should return fallback data when API fails', async () => {
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await marketService.getSkillDemand();

      expect(result).toHaveLength(5);
      expect(result[0]).toHaveProperty('skill');
      expect(result[0]).toHaveProperty('category');
      expect(result[0]).toHaveProperty('demand');
      expect(result[0]).toHaveProperty('growth');
      expect(result[0]).toHaveProperty('marketValue');
      expect(result[0]).toHaveProperty('jobCount');
      expect(result[0]).toHaveProperty('averageSalary');
      expect(result[0]).toHaveProperty('topCompanies');
      expect(result[0]).toHaveProperty('trending');
    });
  });

  describe('getMarketInsights', () => {
    it('should fetch comprehensive market insights', async () => {
      const mockJobTrends: JobTrend[] = [
        {
          id: '1',
          title: 'React Developer',
          category: 'Frontend Development',
          growth: 15.2,
          demand: 92,
          salary: { min: 80000, max: 150000, median: 115000 },
          skills: ['React', 'TypeScript'],
          location: 'San Francisco, CA',
          postedDate: '2024-01-15',
          company: 'TechCorp'
        }
      ];
      const mockSalaryData: SalaryData[] = [
        {
          skill: 'React',
          experience: '3-5 years',
          location: 'San Francisco, CA',
          salary: {
            min: 80000,
            max: 150000,
            median: 115000,
            percentiles: {
              p25: 95000,
              p50: 115000,
              p75: 135000,
              p90: 150000
            }
          },
          demand: 92,
          growth: 15.2,
          lastUpdated: '2024-01-15'
        }
      ];
      const mockSkillDemand: SkillDemand[] = [
        {
          skill: 'React',
          category: 'Frontend Development',
          demand: 92,
          growth: 15.2,
          marketValue: 115000,
          jobCount: 15420,
          averageSalary: 115000,
          topCompanies: ['Google', 'Meta', 'Netflix', 'Airbnb'],
          trending: true,
          lastUpdated: '2024-01-15'
        }
      ];

      // Mock the individual service calls
      jest.spyOn(marketService, 'getJobTrends').mockResolvedValueOnce(mockJobTrends);
      jest.spyOn(marketService, 'getSalaryData').mockResolvedValueOnce(mockSalaryData);
      jest.spyOn(marketService, 'getSkillDemand').mockResolvedValueOnce(mockSkillDemand);

      const result = await marketService.getMarketInsights();

      expect(result).toHaveProperty('topSkills');
      expect(result).toHaveProperty('trendingJobs');
      expect(result).toHaveProperty('salaryInsights');
      expect(result).toHaveProperty('marketOverview');
      expect(result.marketOverview).toHaveProperty('totalJobs');
      expect(result.marketOverview).toHaveProperty('averageSalary');
      expect(result.marketOverview).toHaveProperty('growthRate');
      expect(result.marketOverview).toHaveProperty('topCategories');
    });

    it('should handle errors in market insights', async () => {
      jest.spyOn(marketService, 'getJobTrends').mockRejectedValueOnce(new Error('API Error'));

      await expect(marketService.getMarketInsights()).rejects.toThrow('API Error');
    });
  });
}); 