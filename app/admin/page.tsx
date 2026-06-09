"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Users, 
  FileText, 
  Clock, 
  AlertTriangle, 
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ["#ea2804", "#202020", "#bbbbbb", "#575757", "#f3f0e8", "#888888"];

export default function AdminDashboard() {
  const requests = useQuery(api.requests.list) || [];

  // Calculate dynamic category data
  const categoryCounts = requests.reduce((acc: Record<string, number>, req) => {
    acc[req.category] = (acc[req.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value: Math.round((value / requests.length) * 100)
  })).sort((a, b) => b.value - a.value);

  // Calculate dynamic monthly data
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d.toLocaleString('fr-FR', { month: 'short' });
  }).reverse();

  const monthlyData = last6Months.map(month => {
    const monthRequests = requests.filter(req => {
      const d = new Date(req.createdAt);
      return d.toLocaleString('fr-FR', { month: 'short' }) === month;
    });
    return {
      month,
      total: monthRequests.length,
      solved: monthRequests.filter(r => r.status === "Résolue" || r.status === "Clôturée").length
    };
  });

  // Calculate Service Performance
  const services = Array.from(new Set(requests.map(r => r.service)));
  const performanceData = services.map(service => {
    const serviceRequests = requests.filter(r => r.service === service);
    const resolved = serviceRequests.filter(r => r.status === "Résolue" || r.status === "Clôturée").length;
    return {
      name: service,
      percentage: serviceRequests.length > 0 ? Math.round((resolved / serviceRequests.length) * 100) : 0
    };
  }).sort((a, b) => b.percentage - a.percentage).slice(0, 3);

  const kpis = [
    { title: "Total Demandes", value: requests.length.toString(), trend: "+12%", icon: FileText, color: "text-ink" },
    { title: "En Cours", value: requests.filter(r => r.status === "En Cours").length.toString(), trend: "-5%", icon: Clock, color: "text-primary" },
    { title: "Critiques", value: requests.filter(r => r.priority === "Critique").length.toString(), trend: "+2", icon: AlertTriangle, color: "text-red-500" },
    { title: "Utilisateurs Actifs", value: new Set(requests.map(r => r.userId)).size.toString(), trend: "+85", icon: Users, color: "text-badge-success" },
  ];

  const recentActivity = requests.slice(0, 5);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-display font-bold text-ink">Vue d&apos;ensemble Admin</h1>
        <p className="text-charcoal mt-2">Suivez la performance du support TGCC en temps réel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-charcoal">{kpi.title}</CardTitle>
                  <Icon size={18} className={kpi.color} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{kpi.value}</div>
                  <p className={`text-xs mt-1 font-semibold flex items-center gap-1 ${
                    kpi.trend.startsWith("+") ? "text-badge-success" : "text-red-500"
                  }`}>
                    <TrendingUp size={12} />
                    {kpi.trend} par rapport au mois dernier
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-display font-bold">Volume des demandes par mois</CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#bbbbbb" opacity={0.3} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#646464" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#646464" }} />
                <Tooltip 
                  cursor={{ fill: "#f3f0e8" }}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #bbbbbb", boxShadow: "none" }}
                />
                <Bar dataKey="total" fill="#ea2804" radius={[4, 4, 0, 0]} />
                <Bar dataKey="solved" fill="#202020" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-display font-bold">Répartition par catégorie</CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData.length > 0 ? categoryData : [{ name: "Aucune", value: 100 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.length > 0 ? categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  )) : <Cell fill="#bbbbbb" />}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {categoryData.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-xs font-semibold text-charcoal">{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-hairline">
            <CardTitle className="text-lg font-display font-bold">Activité Récente</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-hairline">
              {recentActivity.map((req) => (
                <div key={req._id} className="p-4 flex items-center justify-between hover:bg-surface-bone transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-surface-bone flex items-center justify-center border border-hairline">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{req.subject}: {req.reference}</p>
                      <p className="text-xs text-charcoal">Par {req.userName} • Service {req.service}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-mute">
                    {new Date(req.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <div className="p-8 text-center text-charcoal italic">Aucune activité récente</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-hairline">
            <CardTitle className="text-lg font-display font-bold">Performances Services</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {performanceData.map((perf) => (
              <div key={perf.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{perf.name}</span>
                  <span className={`${perf.percentage >= 80 ? "text-badge-success" : "text-primary"} font-bold`}>{perf.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-surface-bone rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${perf.percentage >= 80 ? "bg-badge-success" : "bg-primary"}`} 
                    style={{ width: `${perf.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            {performanceData.length === 0 && (
              <div className="text-center text-charcoal italic text-sm">Pas de données de performance</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
