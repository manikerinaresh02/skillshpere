import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, MapPin, DollarSign, Users, Building } from 'lucide-react';

export const MarketInsights = () => {
  const salaryData = [
    { range: '50-70K', count: 25, color: 'hsl(var(--muted-foreground))' },
    { range: '70-90K', count: 35, color: 'hsl(var(--accent))' },
    { range: '90-110K', count: 28, color: 'hsl(var(--secondary))' },
    { range: '110K+', count: 12, color: 'hsl(var(--primary))' },
  ];

  const jobTrends = [
    { month: 'Jan', openings: 1200, applications: 850 },
    { month: 'Feb', openings: 1350, applications: 920 },
    { month: 'Mar', openings: 1100, applications: 780 },
    { month: 'Apr', openings: 1500, applications: 1100 },
    { month: 'May', openings: 1400, applications: 950 },
    { month: 'Jun', openings: 1600, applications: 1200 },
  ];

  const topCompanies = [
    { name: 'TechCorp', openings: 45, avgSalary: 95, rating: 4.2 },
    { name: 'InnovateLab', openings: 32, avgSalary: 88, rating: 4.5 },
    { name: 'DataFlow', openings: 28, avgSalary: 92, rating: 4.1 },
    { name: 'CloudScale', openings: 38, avgSalary: 90, rating: 4.3 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted-foreground))'];

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Active Jobs', value: '2.3K', icon: Building, color: 'text-primary' },
          { label: 'Avg Salary', value: '$92K', icon: DollarSign, color: 'text-secondary' },
          { label: 'Growth Rate', value: '+15%', icon: TrendingUp, color: 'text-accent' },
          { label: 'Companies', value: '450+', icon: Users, color: 'text-muted-foreground' },
        ].map((stat, index) => (
          <Card key={stat.label} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-glass/20 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-poppins font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Job Trends Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📈</span>
              <span>Job Market Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="openings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="applications" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Salary Distribution & Top Companies */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Salary Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={salaryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ range, percent }) => `${range} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {salaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="w-5 h-5" />
                <span>Top Companies</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCompanies.map((company, index) => (
                <div key={company.name} className="flex items-center justify-between p-3 rounded-lg bg-glass/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {company.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{company.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {company.openings} openings
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">${company.avgSalary}K</div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-muted-foreground">★</span>
                      <span className="text-xs font-medium">{company.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Job Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🎯</span>
              <span>Recommended Jobs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Senior React Developer',
                  company: 'TechCorp',
                  location: 'San Francisco, CA',
                  salary: '$120K - $150K',
                  match: 95,
                  skills: ['React', 'TypeScript', 'Node.js'],
                },
                {
                  title: 'Full Stack Engineer',
                  company: 'InnovateLab',
                  location: 'Remote',
                  salary: '$110K - $140K',
                  match: 88,
                  skills: ['Python', 'React', 'AWS'],
                },
                {
                  title: 'ML Engineer',
                  company: 'DataFlow',
                  location: 'New York, NY',
                  salary: '$130K - $160K',
                  match: 82,
                  skills: ['Python', 'TensorFlow', 'AWS'],
                },
                {
                  title: 'DevOps Engineer',
                  company: 'CloudScale',
                  location: 'Austin, TX',
                  salary: '$100K - $130K',
                  match: 78,
                  skills: ['AWS', 'Docker', 'Kubernetes'],
                },
              ].map((job, index) => (
                <div key={job.title} className="p-4 rounded-lg bg-glass/20 border border-glass-border/20 hover:bg-glass/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">
                      {job.match}% match
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button size="sm" className="w-full btn-primary">
                    Apply Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 