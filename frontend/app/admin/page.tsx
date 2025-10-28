import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowUpRight, CheckCircle, Clock, FileText, RefreshCw, XCircle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground text-sm">Monitor and manage anonymous transfers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[0.76rem] font-medium">Total Transactions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[0.76rem] font-medium">Pending Approvals</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[0.76rem] font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">98.3%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[0.76rem] font-medium">Failed Transfers</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requires manual intervention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Transactions</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Overview of the most recent transactions in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Token</th>
                      <th className="px-4 py-2 text-left font-medium">Amount</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">Recipient</th>
                      <th className="px-4 py-2 text-left font-medium">Date</th>
                      <th className="px-4 py-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-mono text-xs">TXN_123456</td>
                      <td className="px-4 py-2">₦50,000</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-2">GTBank ****1234</td>
                      <td className="px-4 py-2">Apr 9, 2023</td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/admin/transactions/TXN_123456">
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-mono text-xs">TXN_123457</td>
                      <td className="px-4 py-2">₦25,000</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          <Clock className="mr-1 h-3 w-3" />
                          Processing
                        </span>
                      </td>
                      <td className="px-4 py-2">Access Bank ****5678</td>
                      <td className="px-4 py-2">Apr 9, 2023</td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/admin/transactions/TXN_123457">
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-mono text-xs">TXN_123458</td>
                      <td className="px-4 py-2">₦75,000</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Flagged
                        </span>
                      </td>
                      <td className="px-4 py-2">Zenith Bank ****9012</td>
                      <td className="px-4 py-2">Apr 8, 2023</td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/admin/transactions/TXN_123458">
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-xs">TXN_123459</td>
                      <td className="px-4 py-2">₦10,000</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                          <XCircle className="mr-1 h-3 w-3" />
                          Failed
                        </span>
                      </td>
                      <td className="px-4 py-2">First Bank ****3456</td>
                      <td className="px-4 py-2">Apr 8, 2023</td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/admin/transactions/TXN_123459">
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/transactions">View All Transactions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flagged" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flagged Transactions</CardTitle>
              <CardDescription>Transactions that require review or manual intervention.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Token</th>
                      <th className="px-4 py-2 text-left font-medium">Amount</th>
                      <th className="px-4 py-2 text-left font-medium">Flag Reason</th>
                      <th className="px-4 py-2 text-left font-medium">Recipient</th>
                      <th className="px-4 py-2 text-left font-medium">Date</th>
                      <th className="px-4 py-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-mono text-xs">TXN_123458</td>
                      <td className="px-4 py-2">₦75,000</td>
                      <td className="px-4 py-2">Suspicious narration</td>
                      <td className="px-4 py-2">Zenith Bank ****9012</td>
                      <td className="px-4 py-2">Apr 8, 2023</td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/admin/approvals/TXN_123458">
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-mono text-xs">TXN_123460</td>
                      <td className="px-4 py-2">₦90,000</td>
                      <td className="px-4 py-2">Multiple transfers to same recipient</td>
                      <td className="px-4 py-2">UBA ****7890</td>
                      <td className="px-4 py-2">Apr 8, 2023</td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/admin/approvals/TXN_123460">
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-xs">TXN_123461</td>
                      <td className="px-4 py-2">₦100,000</td>
                      <td className="px-4 py-2">Maximum amount limit</td>
                      <td className="px-4 py-2">Fidelity Bank ****2345</td>
                      <td className="px-4 py-2">Apr 7, 2023</td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/admin/approvals/TXN_123461">
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/approvals">View All Flagged Transactions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
