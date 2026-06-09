"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function NewRequestPage() {
  const router = useRouter();
  const { user } = useUser();
  const createRequest = useMutation(api.requests.create);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const subject = formData.get("subject") as string;
    const category = formData.get("category") as string;
    const priority = formData.get("priority") as string;
    const service = formData.get("service") as string;
    const description = formData.get("description") as string;

    try {
      await createRequest({
        reference: `REQ-2026-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        subject,
        category,
        priority,
        status: "Ouverte",
        service,
        description,
        userId: user?.id || "anonymous",
        userName: user?.fullName || user?.username || "Anonyme",
      });
      router.push("/requests");
    } catch (error) {
      console.error("Failed to create request:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Link 
        href="/requests" 
        className="inline-flex items-center text-sm font-semibold text-charcoal hover:text-ink transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à mes demandes
      </Link>

      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold">Nouvelle Demande</h1>
        <p className="text-charcoal">Remplissez le formulaire ci-dessous pour soumettre votre demande.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détails de la demande</CardTitle>
          <CardDescription>
            Soyez aussi précis que possible pour faciliter le traitement par nos équipes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input 
                  id="subject" 
                  name="subject"
                  placeholder="Ex: Problème d'accès au serveur" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select name="category" required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT (Informatique)</SelectItem>
                      <SelectItem value="RH">RH (Ressources Humaines)</SelectItem>
                      <SelectItem value="Matériel">Matériel</SelectItem>
                      <SelectItem value="Chantier">Chantier</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                      <SelectItem value="Logistique">Logistique</SelectItem>
                      <SelectItem value="Sécurité">Sécurité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priorité</Label>
                  <Select name="priority" required>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Sélectionner la priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Faible">Faible</SelectItem>
                      <SelectItem value="Normale">Normale</SelectItem>
                      <SelectItem value="Élevée">Élevée</SelectItem>
                      <SelectItem value="Critique">Critique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service concerné</Label>
                <Select name="service" required>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Sélectionner le service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Support IT">Support IT</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Bureau RH">Bureau RH</SelectItem>
                    <SelectItem value="Direction Technique">Direction Technique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder="Décrivez votre problème ou demande en détail..." 
                  className="min-h-[150px]"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label>Pièce jointe (facultatif)</Label>
                <div className="border-2 border-dashed border-hairline rounded-md p-8 flex flex-col items-center justify-center text-charcoal hover:bg-surface-bone transition-colors cursor-pointer group">
                  <Paperclip className="h-8 w-8 mb-2 group-hover:text-primary transition-colors" />
                  <p className="text-sm font-semibold">Cliquez pour ajouter un fichier</p>
                  <p className="text-xs mt-1">Images, PDF ou Documents (Max 10MB)</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button asChild variant="outline" type="button">
                <Link href="/requests">Annuler</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
