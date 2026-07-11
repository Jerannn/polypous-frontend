import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  ArrowRight, 
  ArrowUpRight,
  Clock, 
  FileCode,
  FileText, 
  Plus, 
  PlusCircle,
  Send, 
  Shield,
  Sparkles, 
  Star,
  Trash2, 
  TrendingUp,
  Users, 
  Wallet} from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/(public)/")({
  component: LandingPage,
});

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  balance: number;
  status: "paid" | "unpaid" | "overdue";
}

interface InvoiceHistory {
  id: string;
  clientName: string;
  itemsCount: number;
  total: number;
  date: string;
  status: "paid" | "unpaid";
}

function LandingPage() {
  // Demo States
  const [demoTab, setDemoTab] = React.useState<"invoice" | "analytics" | "clients">("invoice");
  
  // Clients state
  const [clients, setClients] = React.useState<Client[]>([
    { id: "c1", name: "Sarah Connor", email: "sarah@cyberdyne.io", company: "Cyberdyne Systems", balance: 3250.00, status: "unpaid" },
    { id: "c2", name: "Bruce Wayne", email: "bruce@waynecorp.com", company: "Wayne Enterprises", balance: 12500.00, status: "overdue" },
    { id: "c3", name: "Tony Stark", email: "tony@stark.com", company: "Stark Industries", balance: 0.00, status: "paid" },
  ]);

  // Invoice Items state
  const [invoiceItems, setInvoiceItems] = React.useState<InvoiceItem[]>([
    { id: "1", description: "Design System Architecture", quantity: 1, unitPrice: 1500 },
    { id: "2", description: "React Frontend Development", quantity: 20, unitPrice: 75 },
    { id: "3", description: "API Integration", quantity: 5, unitPrice: 50 },
  ]);

  // Tax Rate state
  const [taxRate, setTaxRate] = React.useState<number>(12);
  const [selectedClientId, setSelectedClientId] = React.useState<string>("c1");

  // Invoice list state (populated from demo creation)
  const [invoicesHistory, setInvoicesHistory] = React.useState<InvoiceHistory[]>([
    { id: "INV-001", clientName: "Tony Stark", itemsCount: 4, total: 8400.00, date: "2026-07-01", status: "paid" },
    { id: "INV-002", clientName: "Bruce Wayne", itemsCount: 1, total: 12500.00, date: "2026-07-05", status: "unpaid" },
  ]);

  // Form states for adding items
  const [newItemDesc, setNewItemDesc] = React.useState("");
  const [newItemQty, setNewItemQty] = React.useState<number>(1);
  const [newItemPrice, setNewItemPrice] = React.useState<number>(50);

  // Form states for adding clients
  const [newClientName, setNewClientName] = React.useState("");
  const [newClientEmail, setNewClientEmail] = React.useState("");
  const [newClientCompany, setNewClientCompany] = React.useState("");

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  // Math Calculations for current invoice
  const subtotal = invoiceItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxAmount = parseFloat((subtotal * (taxRate / 100)).toFixed(2));
  const totalAmount = parseFloat((subtotal + taxAmount).toFixed(2));

  // Add Item to Invoice Builder
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemDesc.trim()) {
      toast.error("Please provide an item description.");
      return;
    }
    const newItem: InvoiceItem = {
      id: Math.random().toString(),
      description: newItemDesc.trim(),
      quantity: Math.max(1, newItemQty),
      unitPrice: Math.max(0, newItemPrice)
    };
    setInvoiceItems([...invoiceItems, newItem]);
    setNewItemDesc("");
    setNewItemQty(1);
    setNewItemPrice(50);
    toast.success("Item added to invoice builder");
  };

  // Remove Item from Invoice Builder
  const handleRemoveItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };

  // Create Mock Invoice
  const handleCreateInvoice = () => {
    if (invoiceItems.length === 0) {
      toast.error("Please add at least one item to the invoice.");
      return;
    }
    const client = clients.find(c => c.id === selectedClientId);
    if (!client) {
      toast.error("Please select a client.");
      return;
    }

    const newInvoice: InvoiceHistory = {
      id: `INV-00${invoicesHistory.length + 1}`,
      clientName: client.name,
      itemsCount: invoiceItems.length,
      total: totalAmount,
      date: new Date().toISOString().split('T')[0],
      status: "unpaid"
    };

    // Update clients outstanding balances
    setClients(clients.map(c => {
      if (c.id === client.id) {
        return { ...c, balance: parseFloat((c.balance + totalAmount).toFixed(2)), status: "unpaid" };
      }
      return c;
    }));

    setInvoicesHistory([newInvoice, ...invoicesHistory]);
    toast.success(`Invoice created for ${client.name} totaling $${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}!`);
    
    // Clear items to let user try again
    setInvoiceItems([]);
  };

  // Add Client in Demo
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newClientEmail.trim() || !newClientCompany.trim()) {
      toast.error("Please fill in all client details.");
      return;
    }
    const newClient: Client = {
      id: `c${clients.length + 1}`,
      name: newClientName.trim(),
      email: newClientEmail.trim(),
      company: newClientCompany.trim(),
      balance: 0,
      status: "paid"
    };
    setClients([...clients, newClient]);
    setSelectedClientId(newClient.id);
    setNewClientName("");
    setNewClientEmail("");
    setNewClientCompany("");
    toast.success(`${newClient.name} added successfully! You can select them for invoices.`);
  };

  // Calculate dynamic analytics from states
  const totalBilled = invoicesHistory.reduce((sum, inv) => sum + inv.total, 0) + clients.reduce((sum, c) => c.status === "overdue" ? sum + c.balance : sum, 0);
  const totalReceived = invoicesHistory.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0);
  const totalOutstanding = totalBilled - totalReceived;

  return (
    <div className="flex-1 w-full bg-background relative overflow-hidden flex flex-col">
      {/* Decorative Gradient Background Blobs */}
      <div className="absolute top-24 left-1/4 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-80 right-1/4 translate-x-1/2 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Grid Pattern Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-35 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="container mx-auto px-4 lg:px-8 pt-16 pb-20 relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/15 border border-primary/20 text-primary mb-6 shadow-sm animate-pulse">
          <Sparkles className="size-3.5" />
          <span>Polypous Billing Engine 2.0 is Live</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-foreground">
          Invoicing that flows like <br />
          <span className="bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent">
            Clockwork.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Manage your client directories, issue professional itemized invoices, record collections, and analyze cash flow in one sleek, interconnected branching workspace.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button className="h-11 px-6 rounded-lg text-sm font-semibold shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary text-primary-foreground hover:bg-primary/95 flex items-center gap-2" asChild>
            <Link to="/auth/register">
              Start Free Trial <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" className="h-11 px-6 rounded-lg text-sm font-medium hover:bg-muted/50" onClick={() => document.getElementById("live-demo")?.scrollIntoView({ behavior: "smooth" })}>
            Try the Interactive Demo
          </Button>
        </div>

        {/* Floating Metrics Badge in Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border border-border/60 bg-card/60 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">99.4%</div>
            <div className="text-xs text-muted-foreground mt-1">Collection Accuracy</div>
          </div>
          <div className="border-l border-border/80">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">10+</div>
            <div className="text-xs text-muted-foreground mt-1">Global Currencies</div>
          </div>
          <div className="border-l border-border/80">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">&lt; 3m</div>
            <div className="text-xs text-muted-foreground mt-1">Invoice Generation</div>
          </div>
          <div className="border-l border-border/80">
            <div className="text-2xl sm:text-3xl font-bold text-accent">0$</div>
            <div className="text-xs text-muted-foreground mt-1">Hidden Setup Fees</div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE DEMO (THE WOW FACTOR) */}
      <section id="live-demo" className="container mx-auto px-4 lg:px-8 py-16 relative z-10 max-w-5xl">
        <div className="text-center mb-10">
          <Badge className="bg-accent/15 text-accent-foreground border-accent/20 mb-2">Try It Live</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold">Interactive Sandbox Mockup</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
            Try creating an invoice, editing items, and adding clients. See how analytics react dynamically right on the page!
          </p>
        </div>

        <div className="border border-border/80 bg-card/75 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px] max-w-5xl mx-auto">
          
          {/* Mock Dashboard Sidebar */}
          <div className="md:col-span-3 border-r border-border bg-muted/30 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 px-2 py-2 mb-6 border-b border-border/60">
                <div className="size-6 rounded bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-black">P</div>
                <div>
                  <div className="font-semibold text-xs text-foreground leading-none">Polypous Demo</div>
                  <span className="text-[10px] text-muted-foreground">Free Workspace Sandbox</span>
                </div>
              </div>

              <nav className="space-y-1.5">
                <button 
                  onClick={() => setDemoTab("invoice")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${demoTab === "invoice" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <FileText className="size-4" />
                  <span>Invoice Builder</span>
                </button>
                <button 
                  onClick={() => setDemoTab("clients")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${demoTab === "clients" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <Users className="size-4" />
                  <span>Clients Database</span>
                </button>
                <button 
                  onClick={() => setDemoTab("analytics")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${demoTab === "analytics" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <TrendingUp className="size-4" />
                  <span>Live Analytics</span>
                  <span className="ml-auto size-2 bg-accent rounded-full animate-ping" />
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-border/60 text-[10px] text-muted-foreground">
              <p>Active Account: <span className="font-medium text-foreground">admin@polypous.dev</span></p>
            </div>
          </div>

          {/* Mock Dashboard Main Content Panel */}
          <div className="md:col-span-9 p-4 sm:p-6 flex flex-col justify-between bg-card">
            <div>
              {/* Tab Header Banner */}
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-border/50">
                <div>
                  <h3 className="font-bold text-sm text-foreground capitalize">
                    {demoTab === "invoice" ? "Invoice Builder Console" : demoTab === "clients" ? "Client Directory CRM" : "Interactive Analytics Dashboard"}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {demoTab === "invoice" && "Draft and preview professional itemized charges."}
                    {demoTab === "clients" && "Manage contacts, balances, and overall payment health."}
                    {demoTab === "analytics" && "Real-time updates of billings, collections, and pending balances."}
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono border-border/80">
                  {demoTab === "invoice" ? "INV-BUILD-v2.0" : demoTab === "clients" ? "CRM-DB-v1.4" : "ANALYTICS-LIVE"}
                </Badge>
              </div>

              {/* TAB 1: INVOICE BUILDER */}
              {demoTab === "invoice" && (
                <div className="space-y-4">
                  {/* Select Client Dropdown & Tax */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/20 p-3 rounded-lg border border-border/40">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Invoice Client Destination</label>
                      <select 
                        value={selectedClientId} 
                        onChange={(e) => setSelectedClientId(e.target.value)}
                        className="w-full bg-card border border-border rounded px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-primary/70"
                      >
                        {clients.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Tax rate ({taxRate}%)</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="range" 
                          min="0" 
                          max="25" 
                          value={taxRate} 
                          onChange={(e) => setTaxRate(Number(e.target.value))}
                          className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg"
                        />
                        <span className="text-xs font-mono font-bold w-8 text-right">{taxRate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-muted/40 border-b border-border/50 text-[10px] font-bold uppercase text-muted-foreground">
                          <th className="p-2.5">Description</th>
                          <th className="p-2.5 text-center w-16">Qty</th>
                          <th className="p-2.5 text-right w-24">Unit Price</th>
                          <th className="p-2.5 text-right w-24">Amount</th>
                          <th className="p-2.5 text-center w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceItems.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-6 text-center text-muted-foreground text-[11px] italic">
                              No items added to invoice. Fill out the form below to add one.
                            </td>
                          </tr>
                        ) : (
                          invoiceItems.map((item) => (
                            <tr key={item.id} className="border-b border-border/30 hover:bg-muted/10">
                              <td className="p-2.5 font-medium text-foreground">{item.description}</td>
                              <td className="p-2.5 text-center font-mono">{item.quantity}</td>
                              <td className="p-2.5 text-right font-mono">${item.unitPrice.toFixed(2)}</td>
                              <td className="p-2.5 text-right font-mono">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                              <td className="p-2.5 text-center">
                                <button onClick={() => handleRemoveItem(item.id)} className="text-destructive hover:text-destructive/80 transition-colors p-1 cursor-pointer">
                                  <Trash2 className="size-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Add New Line Item Form */}
                  <form onSubmit={handleAddItem} className="grid grid-cols-12 gap-2 bg-muted/10 p-2.5 rounded-lg border border-border/30">
                    <div className="col-span-6 sm:col-span-7">
                      <Input 
                        placeholder="Item description (e.g. Server hosting, consultation)" 
                        value={newItemDesc}
                        onChange={(e) => setNewItemDesc(e.target.value)}
                        className="h-8 text-xs bg-card"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <Input 
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={newItemQty || ""}
                        onChange={(e) => setNewItemQty(Number(e.target.value))}
                        className="h-8 text-xs bg-card font-mono text-center"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="Price"
                        value={newItemPrice || ""}
                        onChange={(e) => setNewItemPrice(Number(e.target.value))}
                        className="h-8 text-xs bg-card font-mono text-right"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-1 flex justify-end">
                      <Button type="submit" size="sm" variant="secondary" className="h-8 w-full sm:w-auto cursor-pointer" title="Add Line Item">
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: CLIENTS CRM */}
              {demoTab === "clients" && (
                <div className="space-y-4">
                  {/* Active Client list */}
                  <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-muted/40 border-b border-border/50 text-[10px] font-bold uppercase text-muted-foreground">
                          <th className="p-2.5">Name</th>
                          <th className="p-2.5">Company</th>
                          <th className="p-2.5">Email</th>
                          <th className="p-2.5 text-right">Outstanding Bal.</th>
                          <th className="p-2.5 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map((c) => (
                          <tr key={c.id} className="border-b border-border/30 hover:bg-muted/10">
                            <td className="p-2.5 font-semibold text-foreground">{c.name}</td>
                            <td className="p-2.5 text-muted-foreground">{c.company}</td>
                            <td className="p-2.5 font-mono text-muted-foreground">{c.email}</td>
                            <td className="p-2.5 text-right font-mono font-medium">${c.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td className="p-2.5 text-center">
                              <Badge 
                                className={`text-[9px] font-bold capitalize px-2 py-0.5 pointer-events-none ${
                                  c.status === "paid" ? "bg-primary/10 text-primary border border-primary/20" : 
                                  c.status === "unpaid" ? "bg-accent/15 text-accent border border-accent/20" : 
                                  "bg-destructive/10 text-destructive border border-destructive/20"
                                }`}
                              >
                                {c.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Add Client Subform */}
                  <form onSubmit={handleAddClient} className="bg-muted/20 p-3 rounded-lg border border-border/40 space-y-2.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Register New Client</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <Input 
                        placeholder="Client Name" 
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                        className="h-8 text-xs bg-card"
                      />
                      <Input 
                        placeholder="Company" 
                        value={newClientCompany}
                        onChange={(e) => setNewClientCompany(e.target.value)}
                        className="h-8 text-xs bg-card"
                      />
                      <Input 
                        placeholder="Billing Email" 
                        type="email"
                        value={newClientEmail}
                        onChange={(e) => setNewClientEmail(e.target.value)}
                        className="h-8 text-xs bg-card"
                      />
                    </div>
                    <div className="flex justify-end pt-1">
                      <Button type="submit" size="sm" className="h-7 cursor-pointer flex items-center gap-1">
                        <PlusCircle className="size-3.5" />
                        <span>Add Client Profile</span>
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: LIVE ANALYTICS */}
              {demoTab === "analytics" && (
                <div className="space-y-4">
                  {/* KPI Panels */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border border-border/50 bg-muted/10 p-3.5 rounded-lg">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">Aggregated Volume</div>
                      <div className="text-xl font-bold text-foreground mt-1">${totalBilled.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">Calculated from generated invoices</div>
                    </div>
                    <div className="border border-border/50 bg-primary/5 p-3.5 rounded-lg border-primary/20">
                      <div className="text-[10px] font-bold text-primary uppercase">Collected Volume</div>
                      <div className="text-xl font-bold text-primary mt-1">${totalReceived.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">Cleared, reconciliated payments</div>
                    </div>
                    <div className="border border-border/50 bg-accent/5 p-3.5 rounded-lg border-accent/20">
                      <div className="text-[10px] font-bold text-accent uppercase">Outstanding Receivables</div>
                      <div className="text-xl font-bold text-accent mt-1">${totalOutstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">Unpaid & Overdue collections</div>
                    </div>
                  </div>

                  {/* Visual Chart - HTML styled graph */}
                  <div className="border border-border/50 rounded-lg p-4 bg-muted/5">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-[11px] font-bold uppercase text-muted-foreground">Monthly Invoicing History</div>
                      <div className="flex gap-3 text-[10px]">
                        <span className="flex items-center gap-1"><span className="size-2 rounded bg-primary" /> Billed</span>
                        <span className="flex items-center gap-1"><span className="size-2 rounded bg-accent" /> Collected</span>
                      </div>
                    </div>

                    <div className="h-28 flex items-end gap-5 pt-4 px-2 border-b border-border/60">
                      {/* Bar 1: April */}
                      <div className="flex-1 flex flex-col items-center h-full justify-end">
                        <div className="w-full flex justify-center gap-1 items-end h-full">
                          <div className="w-4 bg-primary/40 rounded-t h-[40%]" title="Billed: $4,500" />
                          <div className="w-4 bg-primary rounded-t h-[35%]" title="Collected: $3,900" />
                        </div>
                        <span className="text-[9px] text-muted-foreground mt-1.5">April</span>
                      </div>

                      {/* Bar 2: May */}
                      <div className="flex-1 flex flex-col items-center h-full justify-end">
                        <div className="w-full flex justify-center gap-1 items-end h-full">
                          <div className="w-4 bg-primary/40 rounded-t h-[65%]" title="Billed: $7,200" />
                          <div className="w-4 bg-primary rounded-t h-[60%]" title="Collected: $6,500" />
                        </div>
                        <span className="text-[9px] text-muted-foreground mt-1.5">May</span>
                      </div>

                      {/* Bar 3: June */}
                      <div className="flex-1 flex flex-col items-center h-full justify-end">
                        <div className="w-full flex justify-center gap-1 items-end h-full">
                          <div className="w-4 bg-primary/40 rounded-t h-[85%]" title="Billed: $9,400" />
                          <div className="w-4 bg-primary rounded-t h-[80%]" title="Collected: $8,400" />
                        </div>
                        <span className="text-[9px] text-muted-foreground mt-1.5">June</span>
                      </div>

                      {/* Bar 4: July (React State Driven!) */}
                      <div className="flex-1 flex flex-col items-center h-full justify-end">
                        <div className="w-full flex justify-center gap-1 items-end h-full">
                          <div 
                            className="w-4 bg-primary/50 rounded-t transition-all duration-500" 
                            style={{ height: `${Math.min(100, Math.max(15, (totalBilled / 25000) * 100))}%` }} 
                            title={`Billed: $${totalBilled}`}
                          />
                          <div 
                            className="w-4 bg-primary rounded-t transition-all duration-500" 
                            style={{ height: `${Math.min(100, Math.max(10, (totalReceived / 25000) * 100))}%` }} 
                            title={`Collected: $${totalReceived}`}
                          />
                        </div>
                        <span className="text-[9px] text-foreground font-bold mt-1.5">July (Live)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Calculations and Actions Footer panel (Only for Invoices and Clients summary) */}
            <div className="mt-6 pt-4 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/10 p-3 rounded-lg">
              {demoTab === "invoice" ? (
                <>
                  <div className="flex flex-wrap gap-4 text-xs font-mono">
                    <div>Subtotal: <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span></div>
                    <div className="text-muted-foreground">Tax ({taxRate}%): <span className="font-semibold">${taxAmount.toFixed(2)}</span></div>
                    <div className="border-l border-border pl-4">Total Due: <span className="font-extrabold text-primary text-sm">${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
                  </div>
                  <Button 
                    onClick={handleCreateInvoice} 
                    className="w-full sm:w-auto h-8 px-4 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="size-3.5" />
                    <span>Create & Record Invoice</span>
                  </Button>
                </>
              ) : (
                <div className="w-full flex justify-between items-center text-[11px] text-muted-foreground">
                  <span>Interactive sandbox environment. Changes persist temporarily in browser state.</span>
                  <Button 
                    variant="link" 
                    size="xs"
                    onClick={() => {
                      setClients([
                        { id: "c1", name: "Sarah Connor", email: "sarah@cyberdyne.io", company: "Cyberdyne Systems", balance: 3250.00, status: "unpaid" },
                        { id: "c2", name: "Bruce Wayne", email: "bruce@waynecorp.com", company: "Wayne Enterprises", balance: 12500.00, status: "overdue" },
                        { id: "c3", name: "Tony Stark", email: "tony@stark.com", company: "Stark Industries", balance: 0.00, status: "paid" },
                      ]);
                      setInvoiceItems([
                        { id: "1", description: "Design System Architecture", quantity: 1, unitPrice: 1500 },
                        { id: "2", description: "React Frontend Development", quantity: 20, unitPrice: 75 },
                        { id: "3", description: "API Integration", quantity: 5, unitPrice: 50 },
                      ]);
                      setTaxRate(12);
                      setInvoicesHistory([
                        { id: "INV-001", clientName: "Tony Stark", itemsCount: 4, total: 8400.00, date: "2026-07-01", status: "paid" },
                        { id: "INV-002", clientName: "Bruce Wayne", itemsCount: 1, total: 12500.00, date: "2026-07-05", status: "unpaid" },
                      ]);
                      toast.success("Sandbox state has been reset.");
                    }}
                    className="text-primary cursor-pointer hover:underline p-0"
                  >
                    Reset Sandbox
                  </Button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES GRID */}
      <section className="bg-muted/30 border-y border-border py-20 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">Platform Capabilities</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Structured to Accelerate Cash Flow</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
              Everything you need to send clean invoices, record payments, and track client balance histories in a clean workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="group border border-border/60 bg-card hover:bg-card/90 rounded-xl p-6 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <FileCode className="size-5" />
              </div>
              <h3 className="font-bold text-sm mb-2 text-foreground">Itemized Invoicing</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Add precise descriptions, quantities, and rates. Apply specific local tax settings (VAT/GST) to each invoice with exact precision.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group border border-border/60 bg-card hover:bg-card/90 rounded-xl p-6 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <Users className="size-5" />
              </div>
              <h3 className="font-bold text-sm mb-2 text-foreground">Client Ledger Profiles</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Track full invoicing histories and overall collections per client. Spot overdue accounts instantly with clean visual tags.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group border border-border/60 bg-card hover:bg-card/90 rounded-xl p-6 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <Wallet className="size-5" />
              </div>
              <h3 className="font-bold text-sm mb-2 text-foreground">Payment Reconciliation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Record receipts, bank reference numbers, payment dates, and private comments to keep audits aligned and transparent.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group border border-border/60 bg-card hover:bg-card/90 rounded-xl p-6 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <TrendingUp className="size-5" />
              </div>
              <h3 className="font-bold text-sm mb-2 text-foreground">Revenue Analytics</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Understand business growth at a glance. Visualize billing peaks, collection lags, and current working capital metrics.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group border border-border/60 bg-card hover:bg-card/90 rounded-xl p-6 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <Clock className="size-5" />
              </div>
              <h3 className="font-bold text-sm mb-2 text-foreground">Aging Reports</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Identify accounts requiring attention. Automatically categorize unpaid invoices by 30-day, 60-day, and 90-day overdue thresholds.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group border border-border/60 bg-card hover:bg-card/90 rounded-xl p-6 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <Shield className="size-5" />
              </div>
              <h3 className="font-bold text-sm mb-2 text-foreground">Session Audit Trails</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Verify authentication tokens before editing financial documents, protecting client contracts and billing info from leaks.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="container mx-auto px-4 lg:px-8 py-20 relative z-10 max-w-5xl">
        <div className="text-center mb-12">
          <Badge className="bg-accent/15 text-accent-foreground border-accent/20 mb-2">User Feedback</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Approved by Agencies & Teams</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
            See how freelancers and boutique design studios organize client invoices with Polypous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="border border-border/60 bg-card rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-0.5 text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "We managed billing via spreadsheets for years. Transitioning to Polypous's structured client ledger helped us collect $15k in outstanding fees within the first two weeks."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-border/50 mt-4">
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">MS</div>
              <div>
                <div className="text-xs font-bold text-foreground">Marcus Sterling</div>
                <div className="text-[10px] text-muted-foreground">Founder, Sterling Code Ltd.</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="border border-border/60 bg-card rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-0.5 text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "The live invoice builder mockup is exactly like the app. Beautifully simple. I can add client accounts, customize items, and issue clear receipts. Plus, it loads instantly."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-border/50 mt-4">
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">LL</div>
              <div>
                <div className="text-xs font-bold text-foreground">Lina Lindqvist</div>
                <div className="text-[10px] text-muted-foreground">Freelance Brand Consultant</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="border border-border/60 bg-card rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-0.5 text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "The revenue charts make cash flows transparent. Being able to record fractional payments and keep reference comments keeps our auditing clean for tax preparation season."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-border/50 mt-4">
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">DK</div>
              <div>
                <div className="text-xs font-bold text-foreground">Devon Kincaid</div>
                <div className="text-[10px] text-muted-foreground">Managing Partner, Nexus Design</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <section className="border-t border-border bg-muted/20 py-20 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">Help Center</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Have questions about how Polypous works? Check out details below.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Is the invoice data private?",
                a: "Absolutely. Polypous validates authorization tokens for every read/write action. Your financial ledgers, items, prices, and client information are locked behind industry-standard encryption."
              },
              {
                q: "Can I manage clients with different currencies?",
                a: "Yes. Polypous supports multiple local currencies including PHP, USD, EUR, GBP, JPY, IDR, and more. You can customize active currencies inside workspace settings."
              },
              {
                q: "How does payment tracking align with accounting?",
                a: "When clients pay, you can record details like bank wire reference numbers, check numbers, payment dates, and payment methods. This makes it easy to export invoice ledgers for tax compliance."
              },
              {
                q: "Is there a limit on clients or invoices?",
                a: "The standard trial allows you to manage up to 10 clients and unlimited invoices. For higher volume agencies, you can upgrade your plan inside settings at any time."
              }
            ].map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-border/60 bg-card rounded-lg overflow-hidden transition-all duration-300"
                >
                  <button 
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-foreground hover:bg-muted/40 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-muted-foreground font-bold text-xs">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="p-4 pt-0 text-xs text-muted-foreground border-t border-border/30 bg-muted/10 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER BANNER */}
      <section className="container mx-auto px-4 lg:px-8 py-20 text-center relative z-10 max-w-4xl">
        <div className="bg-gradient-to-tr from-card to-muted/30 border border-border/85 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 blur-[80px] pointer-events-none rounded-full" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Simplify Client Billing Today.
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
            Create your account in under 2 minutes. No credit card required. Experience clean business tracking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="h-10 px-6 rounded-lg text-sm font-semibold shadow-md bg-primary text-primary-foreground hover:bg-primary/95 flex items-center gap-1.5 cursor-pointer" asChild>
              <Link to="/auth/register">
                Register Free Account <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" className="h-10 px-6 rounded-lg text-sm font-semibold hover:bg-muted/50" asChild>
              <Link to="/auth/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

