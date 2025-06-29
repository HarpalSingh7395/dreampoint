"use client"

import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconLayoutColumns,
    IconEdit,
    IconTrash,
    IconFileText,
    IconMapPin,
    IconRefresh,
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
import { Button, buttonVariants } from "@/components/ui/button"
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import React from "react"
import Link from "next/link"
import { Undo } from "lucide-react"

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
    deletedAt: z.string().nullable(),
})

type UserType = z.infer<typeof schema>

// Delete Confirmation Dialog Component
function DeleteUserDialog({ user, onDelete }: { user: UserType; onDelete: () => void }) {
    const [loading, setLoading] = React.useState(false)

    const handleSoftDelete = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/users/${user.id}/soft-delete`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            })

            if (response.ok) {
                onDelete()
            } else {
                console.error("Failed to soft delete user")
            }
        } catch (error) {
            console.error("Error soft deleting user:", error)
        } finally {
            setLoading(false)
        }
    }

    const handlePermanentDelete = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/admin/users/${user.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })

            if (response.ok) {
                onDelete()
            } else {
                console.error("Failed to permanently delete user")
            }
        } catch (error) {
            console.error("Error permanently deleting user:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                    <IconTrash className="h-4 w-4 mr-2" />
                    Delete User
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        {`What type of deletion would you like to perform for user "${user.name || user.email}"?`}
                    </p>
                </DialogHeader>
                <div className="flex flex-col sm:flex-row gap-2 justify-end">
                    <Button variant="outline" onClick={() => { }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSoftDelete}
                        disabled={loading}
                        variant="secondary"
                    >
                        {loading ? "Deleting..." : "Soft Delete"}
                    </Button>
                    <Button
                        onClick={handlePermanentDelete}
                        disabled={loading}
                        variant="destructive"
                    >
                        {loading ? "Deleting..." : "Permanent Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function RestoreUserDialog({
    user,
    onRestore,
}: {
    user: UserType
    onRestore: () => void
}) {
    const [loading, setLoading] = React.useState(false)

    const handleRestore = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/users/${user.id}/restore`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            })

            if (res.ok) {
                onRestore()
            } else {
                console.error("Failed to restore user")
            }
        } catch (error) {
            console.error("Error restoring user:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center px-2 py-1.5 text-sm text-green-600 hover:bg-green-50 cursor-pointer">
                    <Undo className="h-4 w-4 mr-2" />
                    Restore User
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Restore User</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        {`Are you sure you want to restore the user "${user.name || user.email}"?`}
                    </p>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleRestore} disabled={loading} variant="default">
                        {loading ? "Restoring..." : "Restore"}
                    </Button>
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
                    <Link href={"/admin/users/" + row.original.id}>
                        <span className="font-medium text-primary hover:underline">
                            {row.original.name || "Unnamed"}
                        </span>
                    </Link>
                    <span className="text-xs text-muted-foreground">{row.original.email}</span>
                    {row.original.deletedAt && (
                        <Badge variant="destructive" className="text-xs w-fit mt-1">
                            Deleted
                        </Badge>
                    )}
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
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className={buttonVariants({
                            size: "sm",
                            variant: "outline"
                        })}>
                            <IconChevronDown className="h-4 w-4" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
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
                                    // Trigger table refresh
                                    window.location.reload()
                                }}
                            >
                                Approve User
                            </DropdownMenuItem>
                        )}
                        <Separator />
                        <DeleteUserDialog
                            user={row.original}
                            onDelete={() => window.location.reload()}
                        />
                        {row.original.deletedAt && <RestoreUserDialog user={row.original} onRestore={() => window.location.reload()} />}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
]

function DraggableRow({ row }: { row: Row<UserType> }) {
    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            className={row.original.deletedAt ? "opacity-60" : ""}
        >
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
    const [loading, setLoading] = React.useState(true)
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
    const [deletedFilter, setDeletedFilter] = React.useState<string>("active")

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

            if (deletedFilter !== "all") {
                params.append("deleted", deletedFilter)
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

    const handleRefresh = () => {
        fetchUsers(pagination.pageIndex, pagination.pageSize)
    }

    React.useEffect(() => {
        fetchUsers(pagination.pageIndex, pagination.pageSize)
    }, [pagination.pageIndex, pagination.pageSize, roleFilter, statusFilter, deletedFilter])

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

                    <Select value={deletedFilter} onValueChange={setDeletedFilter}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by deleted" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active Users</SelectItem>
                            <SelectItem value="deleted">Deleted Users</SelectItem>
                            <SelectItem value="all">All Users</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        <IconRefresh className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        <span className="hidden lg:inline">Refresh</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className={buttonVariants({
                                size: "sm",
                                variant: "outline"
                            })}>
                                <IconLayoutColumns className="h-4 w-4" />
                                <span className="hidden lg:inline">Columns</span>
                                <IconChevronDown className="h-4 w-4" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
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

                    {/* <Button variant="default" size="sm">
                        <IconPlus className="h-4 w-4" />
                        <span className="hidden lg:inline">Add User</span>
                    </Button> */}
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
        </div >
    )
}