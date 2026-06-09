"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Search, Filter, ExternalLink, FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MyRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const requests = useQuery(api.requests.list) || [];

  const stats = [
    { title: "Mes Demandes", value: requests.length, icon: FileText, color: "text-ink" },
    { title: "Demandes Ouvertes", value: requests.filter(r => r.status === "Ouverte").length, icon: AlertCircle, color: "text-red-500" },
    { title: "En Cours", value: requests.filter(r => r.status === "En Cours").length, icon: Clock, color: "text-primary" },
    { title: "Résolues", value: requests.filter(r => r.status === "Résolue").length, icon: CheckCircle2, color: "text-badge-success" },
  ];

  const filteredRequests = requests.filter(req => 
    req.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-bold">Mes Demandes</h1>
          <p className="text-charcoal mt-2">Gérez et suivez l&apos;ensemble de vos demandes de support.</p>
        </div>
        <Button asChild>
          <Link href="/requests/new">Nouvelle Demande</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-charcoal">
                  {stat.title}
                </CardTitle>
                <Icon size={18} className={stat.color} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" />
          <Input 
            placeholder="Rechercher par sujet ou référence..." 
            className="pl-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Sujet</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière mise à jour</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request._id}>
                <TableCell className="font-mono text-xs">{request.reference}</TableCell>
                <TableCell className="font-semibold">{request.subject}</TableCell>
                <TableCell>{request.service}</TableCell>
                <TableCell>{request.priority}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${
                      request.status === "Ouverte" ? "bg-red-500" :
                      request.status === "En Cours" ? "bg-primary" :
                      "bg-badge-success"
                    }`} />
                    {request.status}
                  </div>
                </TableCell>
                <TableCell className="text-charcoal">
                  {new Date(request.updatedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/requests/${request._id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
}
