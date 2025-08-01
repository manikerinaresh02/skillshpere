import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, DollarSign, Users, Building, MapPin, Calendar, AlertCircle, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Define types locally to avoid import issues
interface JobTrend {
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

interface SkillDemand {
  skillId: string;
  skillName: string;
  category: string;
  demandScore: number;
  growthRate: number;
  avgSalary: number;
  jobCount: number;
  trend: 'rising' | 'stable' | 'declining';
}

interface SalaryData {
  skillId: string;
  skillName: string;
  category: string;
  entryLevel: number;
  midLevel: number;
  seniorLevel: number;
  expertLevel: number;
  avgSalary: number;
  growthRate: number;
}

// Chart data for job market trends
const jobMarketTrendsData = [
  { month: 'Jan', activeJobs: 1200, newJobs: 850, growth: 12.5 },
  { month: 'Feb', activeJobs: 1350, newJobs: 900, growth: 15.2 },
  { month: 'Mar', activeJobs: 1100, newJobs: 780, growth: 8.7 },
  { month: 'Apr', activeJobs: 1550, newJobs: 1150, growth: 18.3 },
  { month: 'May', activeJobs: 1350, newJobs: 900, growth: 14.1 },
  { month: 'Jun', activeJobs: 1600, newJobs: 1200, growth: 16.8 }
];

// Salary trend data with more comprehensive data
const salaryTrendData = [
  { month: 'Jan', avgSalary: 92000, entryLevel: 65000, seniorLevel: 130000, frontend: 85000, backend: 95000, fullstack: 110000 },
  { month: 'Feb', avgSalary: 94000, entryLevel: 67000, seniorLevel: 132000, frontend: 87000, backend: 97000, fullstack: 112000 },
  { month: 'Mar', avgSalary: 93000, entryLevel: 66000, seniorLevel: 131000, frontend: 86000, backend: 96000, fullstack: 111000 },
  { month: 'Apr', avgSalary: 96000, entryLevel: 68000, seniorLevel: 135000, frontend: 89000, backend: 99000, fullstack: 114000 },
  { month: 'May', avgSalary: 95000, entryLevel: 67000, seniorLevel: 134000, frontend: 88000, backend: 98000, fullstack: 113000 },
  { month: 'Jun', avgSalary: 98000, entryLevel: 70000, seniorLevel: 138000, frontend: 91000, backend: 101000, fullstack: 116000 }
];

// Comprehensive skill demand data
const skillDemandData = [
  { skill: 'React', demand: 95, growth: 12.5, salary: 115000, category: 'Frontend', experience: '2-5 years' },
  { skill: 'Node.js', demand: 88, growth: 8.3, salary: 108000, category: 'Backend', experience: '3-6 years' },
  { skill: 'Python', demand: 92, growth: 15.2, salary: 112000, category: 'Programming', experience: '1-4 years' },
  { skill: 'AWS', demand: 96, growth: 18.7, salary: 125000, category: 'Cloud', experience: '3-7 years' },
  { skill: 'TypeScript', demand: 89, growth: 10.1, salary: 118000, category: 'Frontend', experience: '2-5 years' },
  { skill: 'Docker', demand: 91, growth: 14.3, salary: 122000, category: 'DevOps', experience: '2-4 years' },
  { skill: 'MongoDB', demand: 85, growth: 7.8, salary: 105000, category: 'Database', experience: '2-5 years' },
  { skill: 'GraphQL', demand: 87, growth: 11.2, salary: 120000, category: 'API', experience: '3-6 years' },
  { skill: 'Kubernetes', demand: 93, growth: 16.5, salary: 128000, category: 'DevOps', experience: '3-7 years' },
  { skill: 'Vue.js', demand: 82, growth: 6.9, salary: 102000, category: 'Frontend', experience: '2-4 years' },
  { skill: 'Angular', demand: 84, growth: 5.2, salary: 110000, category: 'Frontend', experience: '3-6 years' },
  { skill: 'PostgreSQL', demand: 86, growth: 9.1, salary: 108000, category: 'Database', experience: '2-5 years' }
];

export const MarketInsights = () => {
  const [jobTrends, setJobTrends] = useState<JobTrend[]>([]);
  const [skillDemand, setSkillDemand] = useState<SkillDemand[]>([]);
  const [salaryData, setSalaryData] = useState<SalaryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChart, setSelectedChart] = useState<'jobs' | 'salary' | 'skills'>('jobs');
  
  // Search and filter states
  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState('all');
  const [skillExperienceFilter, setSkillExperienceFilter] = useState('all');
  const [salaryCategoryFilter, setSalaryCategoryFilter] = useState('all');
  const [salaryTimeFrame, setSalaryTimeFrame] = useState('6months');

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Use mock data directly instead of service calls
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
          },
          {
            id: '2',
            title: 'Full Stack Engineer',
            category: 'Full Stack Development',
            growth: 18.5,
            demand: 88,
            salary: { min: 90000, max: 160000, median: 125000 },
            skills: ['React', 'Node.js', 'MongoDB'],
            location: 'New York, NY',
            postedDate: '2024-01-14',
            company: 'StartupXYZ'
          },
          {
            id: '3',
            title: 'DevOps Engineer',
            category: 'DevOps',
            growth: 22.1,
            demand: 95,
            salary: { min: 95000, max: 170000, median: 132000 },
            skills: ['Docker', 'Kubernetes', 'AWS'],
            location: 'Austin, TX',
            postedDate: '2024-01-13',
            company: 'CloudTech'
          }
        ];

        const mockSkillDemand: SkillDemand[] = [
          {
            skillId: 'react',
            skillName: 'React',
            category: 'Frontend Development',
            demandScore: 95,
            growthRate: 12.5,
            avgSalary: 115000,
            jobCount: 15420,
            trend: 'rising'
          },
          {
            skillId: 'nodejs',
            skillName: 'Node.js',
            category: 'Backend Development',
            demandScore: 88,
            growthRate: 8.3,
            avgSalary: 108000,
            jobCount: 12850,
            trend: 'rising'
          },
          {
            skillId: 'python',
            skillName: 'Python',
            category: 'Programming Languages',
            demandScore: 92,
            growthRate: 15.2,
            avgSalary: 112000,
            jobCount: 18920,
            trend: 'rising'
          },
          {
            skillId: 'aws',
            skillName: 'AWS',
            category: 'Cloud Computing',
            demandScore: 96,
            growthRate: 18.7,
            avgSalary: 125000,
            jobCount: 16200,
            trend: 'rising'
          }
        ];

        const mockSalaryData: SalaryData[] = [
          {
            skillId: 'react',
            skillName: 'React',
            category: 'Frontend Development',
            entryLevel: 65000,
            midLevel: 95000,
            seniorLevel: 130000,
            expertLevel: 160000,
            avgSalary: 115000,
            growthRate: 12.5
          },
          {
            skillId: 'nodejs',
            skillName: 'Node.js',
            category: 'Backend Development',
            entryLevel: 70000,
            midLevel: 100000,
            seniorLevel: 135000,
            expertLevel: 165000,
            avgSalary: 108000,
            growthRate: 8.3
          },
          {
            skillId: 'python',
            skillName: 'Python',
            category: 'Programming Languages',
            entryLevel: 75000,
            midLevel: 105000,
            seniorLevel: 140000,
            expertLevel: 170000,
            avgSalary: 112000,
            growthRate: 15.2
          }
        ];
        
        setJobTrends(mockJobTrends);
        setSkillDemand(mockSkillDemand);
        setSalaryData(mockSalaryData);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setError('Failed to load market insights. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  // Filter skill demand data based on search and filters
  const filteredSkillDemandData = skillDemandData.filter(skill => {
    const matchesSearch = skill.skill.toLowerCase().includes(skillSearchTerm.toLowerCase());
    const matchesCategory = skillCategoryFilter === 'all' || skill.category === skillCategoryFilter;
    const matchesExperience = skillExperienceFilter === 'all' || skill.experience === skillExperienceFilter;
    
    return matchesSearch && matchesCategory && matchesExperience;
  });

  // Get unique categories and experience levels for filters
  const skillCategories = [...new Set(skillDemandData.map(skill => skill.category))];
  const experienceLevels = [...new Set(skillDemandData.map(skill => skill.experience))];

  if (error) {
    return (
      <div className="space-y-6 text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Error Loading Market Insights</h3>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="glass-card">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                  <p className="text-2xl font-bold text-foreground">2.3K</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-secondary">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15% from last month
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Salary</p>
                  <p className="text-2xl font-bold text-foreground">$92K</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-secondary">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.2% from last month
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                  <p className="text-2xl font-bold text-foreground">+15%</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-secondary">
                  <Calendar className="w-4 h-4 mr-1" />
                  This quarter
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Companies</p>
                  <p className="text-2xl font-bold text-foreground">450+</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-secondary">
                  <MapPin className="w-4 h-4 mr-1" />
                  Hiring actively
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chart Selection Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Market Trends Visualization</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Interactive charts showing job market trends, salary data, and skill demand
            </p>
          </CardHeader>
          <CardContent>
            {/* Chart Type Selector */}
            <div className="flex space-x-2 mb-6">
              <Button
                variant={selectedChart === 'jobs' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedChart('jobs')}
              >
                Job Trends
              </Button>
              <Button
                variant={selectedChart === 'salary' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedChart('salary')}
              >
                Salary Trends
              </Button>
              <Button
                variant={selectedChart === 'skills' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedChart('skills')}
              >
                Skill Demand
              </Button>
            </div>

            {/* Search and Filter Controls for Skill Demand */}
            {selectedChart === 'skills' && (
              <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search skills..."
                        value={skillSearchTerm}
                        onChange={(e) => setSkillSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  {/* Category Filter */}
                  <Select value={skillCategoryFilter} onValueChange={setSkillCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {skillCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Experience Filter */}
                  <Select value={skillExperienceFilter} onValueChange={setSkillExperienceFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Experience Levels</SelectItem>
                      {experienceLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Results Summary */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Showing {filteredSkillDemandData.length} of {skillDemandData.length} skills</span>
                  {skillSearchTerm && (
                    <span>Search: "{skillSearchTerm}"</span>
                  )}
                </div>
              </div>
            )}

            {/* Filter Controls for Salary Analytics */}
            {selectedChart === 'salary' && (
              <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Category Filter */}
                  <Select value={salaryCategoryFilter} onValueChange={setSalaryCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="frontend">Frontend Development</SelectItem>
                      <SelectItem value="backend">Backend Development</SelectItem>
                      <SelectItem value="fullstack">Full Stack Development</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="data">Data Science</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Time Frame Filter */}
                  <Select value={salaryTimeFrame} onValueChange={setSalaryTimeFrame}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Time frame" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                      <SelectItem value="6months">Last 6 Months</SelectItem>
                      <SelectItem value="1year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter Summary */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Filter className="w-4 h-4" />
                  <span>
                    {(() => {
                      const parts = [];
                      if (salaryCategoryFilter !== 'all') {
                        parts.push(`Category: ${salaryCategoryFilter}`);
                      }
                      if (salaryTimeFrame !== '6months') {
                        parts.push(`Time: ${salaryTimeFrame}`);
                      }
                      if (parts.length === 0) {
                        parts.push('All categories, Last 6 months');
                      }
                      return parts.join(' | ');
                    })()}
                  </span>
                </div>
              </div>
            )}

            {/* Chart Container */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {selectedChart === 'jobs' && (
                  <BarChart data={jobMarketTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="activeJobs" fill="#EF4444" name="Active Jobs" />
                    <Bar dataKey="newJobs" fill="#10B981" name="New Jobs" />
                  </BarChart>
                )}

                {selectedChart === 'salary' && (
                  <AreaChart data={salaryTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="avgSalary" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Average Salary" />
                    <Area type="monotone" dataKey="entryLevel" stackId="2" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="Entry Level" />
                    <Area type="monotone" dataKey="seniorLevel" stackId="3" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Senior Level" />
                  </AreaChart>
                )}

                {selectedChart === 'skills' && (
                  <BarChart data={filteredSkillDemandData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9CA3AF" />
                    <YAxis dataKey="skill" type="category" stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                      formatter={(value, name) => [
                        `${value}%`,
                        name === 'demand' ? 'Demand Score' : 'Growth Rate'
                      ]}
                      labelFormatter={(label) => `Skill: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="demand" fill="#8B5CF6" name="Demand Score" />
                    <Bar dataKey="growth" fill="#F59E0B" name="Growth Rate" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* No Results Message for Skill Search */}
            {selectedChart === 'skills' && filteredSkillDemandData.length === 0 && (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No skills found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSkillSearchTerm('');
                    setSkillCategoryFilter('all');
                    setSkillExperienceFilter('all');
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Trending Jobs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Trending Jobs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobTrends.slice(0, 5).map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 rounded-lg border border-glass-border/20 hover:bg-glass/20 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <h4 className="font-semibold text-foreground">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{job.postedDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {job.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        ${job.salary.median.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-secondary" />
                      <span className="text-xs text-secondary">+{job.growth}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Skills Demand */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Top Skills in Demand</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillDemand.slice(0, 6).map((skill, index) => (
                <motion.div
                  key={skill.skillId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="p-4 rounded-lg border border-glass-border/20 hover:bg-glass/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{skill.skillName}</h4>
                    {skill.trend === 'rising' && (
                      <Badge variant="secondary" className="text-xs">
                        Trending
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Demand</span>
                      <span className="font-semibold">{skill.demandScore}%</span>
                    </div>
                    <Progress value={skill.demandScore} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Market Value</span>
                      <span className="font-semibold">${skill.avgSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Growth</span>
                      <span className="text-secondary font-semibold">+{skill.growthRate}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Salary Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Salary Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salaryData.slice(0, 4).map((salary, index) => (
                <motion.div
                  key={salary.skillId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 rounded-lg border border-glass-border/20"
                >
                  <div>
                    <h4 className="font-semibold text-foreground">{salary.skillName}</h4>
                    <p className="text-sm text-muted-foreground">{salary.category} • Entry Level</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                      ${salary.entryLevel.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${salary.midLevel.toLocaleString()} - ${salary.seniorLevel.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-secondary" />
                      <span className="text-xs text-secondary">+{salary.growthRate}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 