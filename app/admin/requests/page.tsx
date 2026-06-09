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
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Search, Filter, ChevronDown, UserPlus, CheckCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const requests = useQuery(api.requests.list) || [];

  const filteredRequests = requests.filter(req => 
    req.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-bold">Gestion des Demandes</h1>
          <p className="text-charcoal mt-2">Gérez l&apos;ensemble des demandes de support de l&apos;organisation.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">Exporter (CSV)</Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" />
          <Input 
            placeholder="Rechercher par sujet, référence ou employé..." 
            className="pl-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtres Avancés
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Référence</TableHead>
              <TableHead>Employé</TableHead>
              <TableHead>Sujet</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Assigné à</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request._id}>
                <TableCell className="font-mono text-xs">{request.reference}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{request.userName}</span>
                    <span className="text-[10px] text-charcoal uppercase">Département Construction</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate font-medium">{request.subject}</TableCell>
                <TableCell>{request.category}</TableCell>
                <TableCell>{request.priority}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${
                      request.status === "Ouverte" ? "bg-red-500" :
                      request.status === "En Cours" ? "bg-primary" :
                      "bg-badge-success"
                    }`} />
                    <span className="text-xs font-bold uppercase tracking-tight">{request.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-xs font-semibold text-charcoal">
                    <UserPlus size={14} />
                    {request.service}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Voir les détails" asChild>
                      <Link href={`/admin/requests/${request._id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" title="Assigner">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Marquer comme résolue">
                      <CheckCircle className="h-4 w-4 text-badge-success" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
}
