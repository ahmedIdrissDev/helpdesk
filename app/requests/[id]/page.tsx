"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  MessageSquare, 
  History,
  Info,
  User,
  Calendar,
  ShieldAlert,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RequestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const request = useQuery(api.requests.get, { id: id as Id<"requests"> });
  const comments = useQuery(api.requests.getComments, { requestId: id as Id<"requests"> });
  const addComment = useMutation(api.requests.addComment);

  const handleSendMessage = async () => {
    if (!message.trim() || !user) return;
    
    setIsSending(true);
    try {
      await addComment({
        requestId: id as Id<"requests">,
        userId: user.id,
        userName: user.fullName || user.username || "Utilisateur",
        content: message.trim(),
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  if (request === undefined) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (request === null) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-charcoal font-semibold">Demande non trouvée</p>
        <Button asChild variant="outline">
          <Link href="/requests">Retour à la liste</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 pb-12"
    >
      <Link 
        href="/requests" 
        className="inline-flex items-center text-sm font-semibold text-charcoal hover:text-ink transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à la liste
      </Link>

      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm bg-surface-bone px-3 py-1 rounded-full border border-hairline">
              {request.reference}
            </span>
            <span className="text-sm font-semibold text-charcoal">
              {request.priority}
            </span>
          </div>
          <h1 className="text-4xl font-display font-bold">{request.subject}</h1>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-hairline">
          <div className={`h-3 w-3 rounded-full ${
            request.status === "Ouverte" ? "bg-red-500" :
            request.status === "En Cours" ? "bg-primary" :
            "bg-badge-success"
          }`} />
          <span className="font-bold text-sm">{request.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 border-b border-hairline bg-surface-bone/30">
              <Info size={18} className="text-charcoal" />
              <CardTitle className="text-lg">Description de la demande</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-body leading-relaxed whitespace-pre-wrap">
                {request.description}
              </p>
              
              <div className="mt-8 pt-8 border-t border-hairline">
                <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal mb-4">Pièces jointes</h4>
                <div className="flex gap-4">
                  <div className="flex items-center gap-3 p-3 bg-surface-bone rounded-md border border-hairline cursor-pointer hover:bg-white transition-colors">
                    <Paperclip size={16} />
                    <span className="text-sm font-semibold">screenshot_error.png</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h3 className="text-xl font-display font-bold flex items-center gap-3">
              <MessageSquare size={20} />
              Discussion
            </h3>
            
            <div className="space-y-4">
              {comments === undefined ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-mute" />
                </div>
              ) : comments.length === 0 ? (
                <p className="text-center py-8 text-sm text-mute italic">Aucun message pour le moment.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment._id} className={`flex gap-4 ${comment.userId === user?.id ? 'justify-end' : ''}`}>
                    {comment.userId !== user?.id && (
                      <div className="h-10 w-10 rounded-full bg-surface-dark flex items-center justify-center text-on-dark text-xs font-bold shrink-0">
                        {comment.userName.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className={`flex-1 space-y-2 ${comment.userId === user?.id ? 'text-right' : ''}`}>
                      <div className={`${
                        comment.userId === user?.id 
                          ? 'bg-primary text-on-primary rounded-tr-none inline-block text-left' 
                          : 'bg-surface-bone text-ink rounded-tl-none'
                      } p-4 rounded-md shadow-sm max-w-[85%]`}>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <div className="block">
                        <span className="text-[10px] text-charcoal font-semibold uppercase">
                          {comment.userId === user?.id ? 'VOUS' : comment.userName} • {new Date(comment.createdAt).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    {comment.userId === user?.id && (
                      <div className="h-10 w-10 rounded-full bg-surface-bone flex items-center justify-center text-ink text-xs font-bold border border-hairline shrink-0">
                        {comment.userName.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <Card className="mt-8">
              <CardContent className="p-4 space-y-4">
                <Textarea 
                  placeholder="Écrire un message..." 
                  className="border-none focus-visible:ring-0 shadow-none min-h-[100px] p-0"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex justify-between items-center pt-2 border-t border-hairline">
                  <Button variant="ghost" size="icon">
                    <Paperclip size={18} />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSendMessage}
                    disabled={isSending || !message.trim()}
                  >
                    {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Répondre
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader className="border-b border-hairline bg-surface-bone/30">
              <CardTitle className="text-sm uppercase tracking-widest text-charcoal">Informations</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-surface-bone flex items-center justify-center border border-hairline">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-charcoal font-bold uppercase">Assigné à</p>
                  <p className="text-sm font-semibold">{request.service}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-surface-bone flex items-center justify-center border border-hairline">
                  <ShieldAlert size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-charcoal font-bold uppercase">Catégorie</p>
                  <p className="text-sm font-semibold">{request.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-surface-bone flex items-center justify-center border border-hairline">
                  <Calendar size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-charcoal font-bold uppercase">Créée le</p>
                  <p className="text-sm font-semibold">{new Date(request.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3 border-b border-hairline bg-surface-bone/30">
              <History size={16} className="text-charcoal" />
              <CardTitle className="text-sm uppercase tracking-widest text-charcoal">Historique</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-hairline">
                <div className="relative pl-10">
                  <div className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full bg-badge-success border-4 border-white" />
                  <p className="text-xs font-bold uppercase text-charcoal">Demande résolue</p>
                  <p className="text-xs text-mute mt-0.5">08 Juin, 16:00</p>
                </div>
                <div className="relative pl-10 opacity-50">
                  <div className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-white" />
                  <p className="text-xs font-bold uppercase text-charcoal">Pris en charge</p>
                  <p className="text-xs text-mute mt-0.5">08 Juin, 10:30</p>
                </div>
                <div className="relative pl-10 opacity-50">
                  <div className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full bg-red-500 border-4 border-white" />
                  <p className="text-xs font-bold uppercase text-charcoal">Demande créée</p>
                  <p className="text-xs text-mute mt-0.5">08 Juin, 09:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
