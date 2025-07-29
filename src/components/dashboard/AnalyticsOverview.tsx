import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const AnalyticsOverview = () => {
  const skillTrendData = [
    { month: 'Jan', react: 65, python: 58, cloud: 60, data: 62 },
    { month: 'Feb', react: 68, python: 63, cloud: 65, data: 66 },
    { month: 'Mar', react: 72, python: 69, cloud: 71, data: 70 },
    { month: 'Apr', react: 78, python: 75, cloud: 76, data: 74 },
    { month: 'May', react: 85, python: 80, cloud: 82, data: 78 },
    { month: 'Jun', react: 88, python: 86, cloud: 87, data: 82 },
    { month: 'Jul', react: 92, python: 89, cloud: 91, data: 85 },
  ];

  const marketData = [
    { name: 'AI/ML', value: 89, color: 'hsl(var(--primary))' },
    { name: 'Cloud', value: 91, color: 'hsl(var(--secondary))' },
    { name: 'React', value: 92, color: 'hsl(var(--accent))' },
    { name: 'Data', value: 85, color: 'hsl(var(--muted-foreground))' },
  ];

  return (
    <div className="space-y-6">
      {/* Skill Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📈</span>
              <span>Skill Demand Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={skillTrendData}>
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
                <Area 
                  type="monotone" 
                  dataKey="react" 
                  stackId="1"
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="python" 
                  stackId="1"
                  stroke="hsl(var(--secondary))" 
                  fill="hsl(var(--secondary))" 
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="cloud" 
                  stackId="1"
                  stroke="hsl(var(--accent))" 
                  fill="hsl(var(--accent))" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Market Analysis Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🎯</span>
                <span>Market Demand</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketData.map((item, index) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-bold">{item.value}%</span>
                  </div>
                  <Progress 
                    value={item.value} 
                    className="h-2"
                    style={{ 
                      '--progress-background': item.color 
                    } as React.CSSProperties}
                  />
                </div>
              ))}
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
                <span>💼</span>
                <span>Career Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Salary Growth', value: '+15%', description: 'vs last year' },
                { label: 'Job Openings', value: '2.3K', description: 'in your area' },
                { label: 'Skill Gap', value: '3', description: 'skills to learn' },
                { label: 'Market Score', value: '87%', description: 'above average' },
              ].map((insight, index) => (
                <div key={insight.label} className="flex items-center justify-between p-3 rounded-lg bg-glass/20">
                  <div>
                    <div className="font-semibold text-foreground">{insight.label}</div>
                    <div className="text-xs text-muted-foreground">{insight.description}</div>
                  </div>
                  <div className="text-lg font-bold text-primary">{insight.value}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid md:grid-cols-3 gap-4"
      >
        {[
          { title: 'Update Skills', description: 'Add new skills to your profile', action: 'Update' },
          { title: 'View Matches', description: 'See job opportunities', action: 'View' },
          { title: 'Learning Path', description: 'Continue your learning journey', action: 'Continue' },
        ].map((action, index) => (
          <Card key={action.title} className="glass-card hover:bg-glass/30 transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
              <button className="text-primary font-medium hover:underline">
                {action.action} →
              </button>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}; 