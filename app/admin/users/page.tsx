"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, MoreHorizontal, Shield, User as UserIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { getClerkUsers } from "./actions";

interface ClerkUser {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: number;
  lastSignInAt: number | null;
  publicMetadata: any;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<ClerkUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getClerkUsers();
        setUsers(data as ClerkUser[]);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-bold">Utilisateurs</h1>
          <p className="text-charcoal mt-2">Gérez les comptes et les accès des collaborateurs TGCC.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvel Utilisateur
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" />
          <Input 
            placeholder="Rechercher par nom ou email..." 
            className="pl-11" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Créé le</TableHead>
                <TableHead>Dernière Connexion</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {user.imageUrl ? (
                        <img src={user.imageUrl} alt="" className="h-8 w-8 rounded-full border border-hairline" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-surface-bone flex items-center justify-center border border-hairline font-bold text-xs text-charcoal">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <span className="font-semibold">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-charcoal">{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.publicMetadata?.role === "admin" ? (
                        <>
                          <Shield size={14} className="text-primary" />
                          <span className="font-bold text-primary">Admin</span>
                        </>
                      ) : (
                        <>
                          <UserIcon size={14} className="text-charcoal" />
                          <span>Employé</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-charcoal">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-xs font-semibold uppercase text-mute">
                    {user.lastSignInAt 
                      ? new Date(user.lastSignInAt).toLocaleString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : "Jamais connecté"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-charcoal italic">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>
    </motion.div>
  );
}
