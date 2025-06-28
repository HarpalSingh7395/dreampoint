"use client"

import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconLayoutColumns,
    IconPlus,
    IconEye,
    IconEdit,
    IconTrash,
    IconFileText,
    IconMail,
    IconPhone,
    IconMapPin,
    IconUser,
    IconSchool,
    IconClock,
    IconCurrencyRupee,
} from "@tabler/icons-react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    Row,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import React from "react"
import Link from "next/link"

// Updated schema to match your Prisma model
export const schema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    image: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    address: z.string().nullable(),
    role: z.enum(["SUPER_ADMIN", "ADMIN", "TEACHER", "STUDENT", "BASE_USER"]),
    age: z.number().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    qualification: z.string().nullable(),
    extraQualifications: z.any().nullable(),
    institution: z.string().nullable(),
    currentGrade: z.string().nullable(),
    profileStatus: z.enum(["INCOMPLETE", "PENDING_APPROVAL", "APPROVED", "REJECTED"]),
    bio: z.string().nullable(),
    experience: z.number().nullable(),
    hourlyRate: z.number().nullable(),
    specialization: z.string().nullable(),
    subjects: z.string().nullable(),
    teachingGrades: z.string().nullable(),
    availability: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

type UserType = z.infer<typeof schema>

// User Details Dialog Component
function UserDetailsDialog({ user }: { user: UserType }) {
    const getRoleColor = (role: string) => {
        switch (role) {
            case "SUPER_ADMIN": return "bg-red-100 text-red-800"
            case "ADMIN": return "bg-purple-100 text-purple-800"
            case "TEACHER": return "bg-blue-100 text-blue-800"
            case "STUDENT": return "bg-green-100 text-green-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "APPROVED": return "bg-green-100 text-green-800"
            case "PENDING_APPROVAL": return "bg-yellow-100 text-yellow-800"
            case "REJECTED": return "bg-red-100 text-red-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <IconEye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={user.image || ""} alt={user.name || ""} />
                            <AvatarFallback>
                                {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-semibold">{user.name || "Unnamed User"}</h2>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <IconUser className="h-5 w-5" />
                                Basic Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Role</Label>
                                <Badge className={getRoleColor(user.role)}>
                                    {user.role.replace("_", " ")}
                                </Badge>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Profile Status</Label>
                                <Badge className={getStatusColor(user.profileStatus)}>
                                    {user.profileStatus.replace("_", " ")}
                                </Badge>
                            </div>
                            {user.age && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Age</Label>
                                    <p className="text-sm">{user.age} years</p>
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Member Since</Label>
                                <p className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <IconMail className="h-5 w-5" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            {user.phoneNumber && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        <IconPhone className="h-4 w-4" />
                                        Phone Number
                                    </Label>
                                    <p className="text-sm">{user.phoneNumber}</p>
                                </div>
                            )}
                            {user.address && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        <IconMapPin className="h-4 w-4" />
                                        Address
                                    </Label>
                                    <p className="text-sm">{user.address}</p>
                                </div>
                            )}
                            {user.city && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">City</Label>
                                    <p className="text-sm">{user.city}</p>
                                </div>
                            )}
                            {user.state && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">State</Label>
                                    <p className="text-sm">{user.state}</p>
                                </div>
                            )}
                            {user.zipCode && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Zip Code</Label>
                                    <p className="text-sm">{user.zipCode}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Education & Professional Information */}
                    {(user.qualification || user.institution || user.currentGrade) && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <IconSchool className="h-5 w-5" />
                                    Education Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                {user.qualification && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Qualification</Label>
                                        <p className="text-sm">{user.qualification}</p>
                                    </div>
                                )}
                                {user.institution && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Institution</Label>
                                        <p className="text-sm">{user.institution}</p>
                                    </div>
                                )}
                                {user.currentGrade && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Current Grade</Label>
                                        <p className="text-sm">{user.currentGrade}</p>
                                    </div>
                                )}
                                {user.extraQualifications && (
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="text-sm font-medium">Extra Qualifications</Label>
                                        <p className="text-sm">{JSON.stringify(user.extraQualifications)}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Teaching Information (for Teachers) */}
                    {user.role === "TEACHER" && (user.experience || user.hourlyRate || user.specialization || user.subjects) && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <IconSchool className="h-5 w-5" />
                                    Teaching Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                {user.experience && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium flex items-center gap-2">
                                            <IconClock className="h-4 w-4" />
                                            Experience
                                        </Label>
                                        <p className="text-sm">{user.experience} years</p>
                                    </div>
                                )}
                                {user.hourlyRate && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium flex items-center gap-2">
                                            <IconCurrencyRupee className="h-4 w-4" />
                                            Hourly Rate
                                        </Label>
                                        <p className="text-sm">₹{user.hourlyRate}/hour</p>
                                    </div>
                                )}
                                {user.specialization && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Specialization</Label>
                                        <p className="text-sm">{user.specialization}</p>
                                    </div>
                                )}
                                {user.subjects && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Subjects</Label>
                                        <div className="flex flex-wrap gap-1">
                                            {user.subjects.split(',').map((subject, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {subject.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {user.teachingGrades && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Teaching Grades</Label>
                                        <div className="flex flex-wrap gap-1">
                                            {user.teachingGrades.split(',').map((grade, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {grade.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {user.availability && (
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="text-sm font-medium">Availability</Label>
                                        <div className="flex flex-wrap gap-1">
                                            {user.availability.split(',').map((day, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {day.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Bio */}
                    {user.bio && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Bio</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{user.bio}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

const columns: ColumnDef<UserType>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={row.original.image || ""} alt={row.original.name || ""} />
                    <AvatarFallback>
                        {row.original.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <Link href={"/admin/users/" + row.original.id}><span className="font-medium text-primary hover:underline">{row.original.name || "Unnamed"}</span></Link>
                    <span className="text-xs text-muted-foreground">{row.original.email}</span>
                </div>
            </div>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const getRoleColor = (role: string) => {
                switch (role) {
                    case "SUPER_ADMIN": return "bg-red-100 text-red-800"
                    case "ADMIN": return "bg-purple-100 text-purple-800"
                    case "TEACHER": return "bg-blue-100 text-blue-800"
                    case "STUDENT": return "bg-green-100 text-green-800"
                    default: return "bg-gray-100 text-gray-800"
                }
            }
            return (
                <Badge className={getRoleColor(row.original.role)}>
                    {row.original.role.replace("_", " ")}
                </Badge>
            )
        },
    },
    {
        accessorKey: "profileStatus",
        header: "Status",
        cell: ({ row }) => {
            const getStatusColor = (status: string) => {
                switch (status) {
                    case "APPROVED": return "bg-green-100 text-green-800"
                    case "PENDING_APPROVAL": return "bg-yellow-100 text-yellow-800"
                    case "REJECTED": return "bg-red-100 text-red-800"
                    default: return "bg-gray-100 text-gray-800"
                }
            }
            return (
                <Badge className={getStatusColor(row.original.profileStatus)}>
                    {row.original.profileStatus.replace("_", " ")}
                </Badge>
            )
        },
    },
    {
        accessorKey: "city",
        header: "Location",
        cell: ({ row }) => (
            <div className="flex items-center gap-1">
                <IconMapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">
                    {[row.original.city, row.original.state].filter(Boolean).join(", ") || "Not specified"}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone",
        cell: ({ row }) => (
            <span className="text-sm">{row.original.phoneNumber || "Not provided"}</span>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => (
            <span className="text-sm">
                {new Date(row.original.createdAt).toLocaleDateString()}
            </span>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <UserDetailsDialog user={row.original} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <IconChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <IconEdit className="h-4 w-4 mr-2" />
                            Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <IconFileText className="h-4 w-4 mr-2" />
                            View Documents
                        </DropdownMenuItem>
                        {row.original.profileStatus === "PENDING_APPROVAL" && (
                            <DropdownMenuItem
                                onClick={async () => {
                                    await fetch("/api/admin/approve-user", {
                                        method: "POST",
                                        body: JSON.stringify({
                                            id: row.original.id,
                                            action: "APPROVED"
                                        }),
                                        headers: { "Content-Type": "application/json" },
                                    })
                                    // Refresh the table data
                                    window.location.reload()
                                }}
                            >
                                Approve User
                            </DropdownMenuItem>
                        )}
                        <Separator />
                        <DropdownMenuItem className="text-red-600">
                            <IconTrash className="h-4 w-4 mr-2" />
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
]

function DraggableRow({ row }: { row: Row<UserType> }) {
    return (
        <TableRow data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}

export default function UserTable() {
    const [data, setData] = React.useState<UserType[]>([])
    const [total, setTotal] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [roleFilter, setRoleFilter] = React.useState<string>("all")
    const [statusFilter, setStatusFilter] = React.useState<string>("all")

    const fetchUsers = async (page: number, size: number) => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: (page + 1).toString(),
                limit: size.toString(),
            })

            if (roleFilter !== "all") {
                params.append("role", roleFilter)
            }

            if (statusFilter !== "all") {
                params.append("status", statusFilter)
            }

            const res = await fetch(`/api/admin/users?${params.toString()}`)
            const json = await res.json()
            setData(json.users)
            setTotal(json.total)
        } catch (error) {
            console.error("Failed to fetch users:", error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchUsers(pagination.pageIndex, pagination.pageSize)
    }, [pagination.pageIndex, pagination.pageSize, roleFilter, statusFilter])

    const table = useReactTable({
        data,
        columns,
        state: { pagination, rowSelection, columnVisibility, columnFilters, sorting },
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        pageCount: Math.ceil(total / pagination.pageSize),
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="w-full flex-col justify-start gap-6 space-y-6">
            {/* Filters and Actions */}
            <div className="flex items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-4">
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="TEACHER">Teacher</SelectItem>
                            <SelectItem value="STUDENT">Student</SelectItem>
                            <SelectItem value="BASE_USER">Base User</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="INCOMPLETE">Incomplete</SelectItem>
                            <SelectItem value="PENDING_APPROVAL">Pending Approval</SelectItem>
                            <SelectItem value="APPROVED">Approved</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <IconLayoutColumns className="h-4 w-4" />
                                <span className="hidden lg:inline">Columns</span>
                                <IconChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="default" size="sm">
                        <IconPlus className="h-4 w-4" />
                        <span className="hidden lg:inline">Add User</span>
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader className="bg-muted sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Loading users...
                                    </TableCell>
                                </TableRow>
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <DraggableRow key={row.id} row={row} />
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4">
                    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                        <div className="hidden items-center gap-2 lg:flex">
                            <Label htmlFor="rows-per-page" className="text-sm font-medium">
                                Rows per page
                            </Label>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => table.setPageSize(Number(value))}
                            >
                                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </div>
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to first page</span>
                                <IconChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <IconChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <IconChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden size-8 lg:flex"
                                size="icon"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to last page</span>
                                <IconChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}