import { render, screen, waitFor } from '@testing-library/react';
import { MarketInsights } from '../../components/dashboard/MarketInsights';
import { marketService } from '../../services/marketData';

// Mock the market service
jest.mock('../../services/marketData', () => ({
  marketService: {
    getJobTrends: jest.fn(),
    getSalaryData: jest.fn(),
    getSkillDemand: jest.fn(),
  },
}));

const mockedMarketService = marketService as jest.Mocked<typeof marketService>;

describe('MarketInsights Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    // Mock the services to return promises that don't resolve immediately
    mockedMarketService.getJobTrends.mockImplementation(() => new Promise(() => {}));
    mockedMarketService.getSalaryData.mockImplementation(() => new Promise(() => {}));
    mockedMarketService.getSkillDemand.mockImplementation(() => new Promise(() => {}));

    render(<MarketInsights />);

    // Check for loading skeleton elements
    const loadingCards = screen.getAllByRole('generic').filter(el => 
      el.className.includes('animate-pulse')
    );
    expect(loadingCards.length).toBeGreaterThan(0);
  });

  it('should render market overview cards when data loads', async () => {
    const mockJobTrends = [
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

    const mockSkillDemand = [
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

    const mockSalaryData = [
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

    mockedMarketService.getJobTrends.mockResolvedValue(mockJobTrends);
    mockedMarketService.getSalaryData.mockResolvedValue(mockSalaryData);
    mockedMarketService.getSkillDemand.mockResolvedValue(mockSkillDemand);

    render(<MarketInsights />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Total Jobs')).toBeInTheDocument();
    });

    // Check for market overview cards
    expect(screen.getByText('Total Jobs')).toBeInTheDocument();
    expect(screen.getByText('45,620')).toBeInTheDocument();
    expect(screen.getByText('Avg. Salary')).toBeInTheDocument();
    expect(screen.getByText('$118K')).toBeInTheDocument();
    expect(screen.getByText('Top Skills')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Growth Rate')).toBeInTheDocument();
    expect(screen.getByText('15.2%')).toBeInTheDocument();
  });

  it('should render trending jobs section', async () => {
    const mockJobTrends = [
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

    mockedMarketService.getJobTrends.mockResolvedValue(mockJobTrends);
    mockedMarketService.getSalaryData.mockResolvedValue([]);
    mockedMarketService.getSkillDemand.mockResolvedValue([]);

    render(<MarketInsights />);

    await waitFor(() => {
      expect(screen.getByText('Trending Jobs')).toBeInTheDocument();
    });

    expect(screen.getByText('Senior React Developer')).toBeInTheDocument();
    expect(screen.getByText('TechCorp')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('$115,000')).toBeInTheDocument();
  });

  it('should render top skills demand section', async () => {
    const mockSkillDemand = [
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

    mockedMarketService.getJobTrends.mockResolvedValue([]);
    mockedMarketService.getSalaryData.mockResolvedValue([]);
    mockedMarketService.getSkillDemand.mockResolvedValue(mockSkillDemand);

    render(<MarketInsights />);

    await waitFor(() => {
      expect(screen.getByText('Top Skills in Demand')).toBeInTheDocument();
    });

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('92%')).toBeInTheDocument();
    expect(screen.getByText('$115,000')).toBeInTheDocument();
    expect(screen.getByText('+15.2%')).toBeInTheDocument();
  });

  it('should render salary insights section', async () => {
    const mockSalaryData = [
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

    mockedMarketService.getJobTrends.mockResolvedValue([]);
    mockedMarketService.getSalaryData.mockResolvedValue(mockSalaryData);
    mockedMarketService.getSkillDemand.mockResolvedValue([]);

    render(<MarketInsights />);

    await waitFor(() => {
      expect(screen.getByText('Salary Insights')).toBeInTheDocument();
    });

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('3-5 years • San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('$115,000')).toBeInTheDocument();
    expect(screen.getByText('$80,000 - $150,000')).toBeInTheDocument();
    expect(screen.getByText('+15.2%')).toBeInTheDocument();
  });

  it('should handle API errors gracefully', async () => {
    mockedMarketService.getJobTrends.mockRejectedValue(new Error('Network error'));
    mockedMarketService.getSalaryData.mockRejectedValue(new Error('Network error'));
    mockedMarketService.getSkillDemand.mockRejectedValue(new Error('Network error'));

    render(<MarketInsights />);

    // Should still render the component with fallback data
    await waitFor(() => {
      expect(screen.getByText('Total Jobs')).toBeInTheDocument();
    });

    // Check that fallback data is displayed
    expect(screen.getByText('45,620')).toBeInTheDocument();
    expect(screen.getByText('$118K')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('15.2%')).toBeInTheDocument();
  });

  it('should display trending indicators correctly', async () => {
    const mockSkillDemand = [
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
      },
      {
        skill: 'Python',
        category: 'Backend Development',
        demand: 88,
        growth: 12.8,
        marketValue: 125000,
        jobCount: 12850,
        averageSalary: 125000,
        topCompanies: ['Amazon', 'Microsoft', 'Google', 'Uber'],
        trending: false,
        lastUpdated: '2024-01-15'
      }
    ];

    mockedMarketService.getJobTrends.mockResolvedValue([]);
    mockedMarketService.getSalaryData.mockResolvedValue([]);
    mockedMarketService.getSkillDemand.mockResolvedValue(mockSkillDemand);

    render(<MarketInsights />);

    await waitFor(() => {
      expect(screen.getByText('Top Skills in Demand')).toBeInTheDocument();
    });

    // Check that trending badge is shown for trending skills
    expect(screen.getByText('Trending')).toBeInTheDocument();
    
    // Check that both skills are displayed
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });
}); 