"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MoreHorizontal, Users, Calendar, Clock, GraduationCap } from "lucide-react"
import { toast } from "sonner"
import { IconChevronDown, IconLayoutColumns, IconRefresh } from "@tabler/icons-react"
import CreateCourseDialog from "./CreateCourseDialog"
import Link from "next/link"

interface CourseWithStats {
  id: string
  title: string
  description: string | null
  type: "PERSONAL" | "GROUP"
  startDate: string | Date
  endDate: string | Date
  teacher: {
    id: string
    name: string | null
    email: string | null
    phoneNumber: string | null
  }
  schedule: Array<{
    dayOfWeek: string
    startTime: string
    endTime: string
  }>
  enrollments: Array<{
    student: {
      id: string
      name: string | null
      email: string | null
      phoneNumber: string | null
    }
  }>
  status: 'upcoming' | 'active' | 'completed'
  isActive: boolean
  isUpcoming: boolean
  isCompleted: boolean
  studentCount: number
  totalClasses: number
  completedClasses: number
  scheduledClasses: number
  cancelledClasses: number
  progressPercentage: number
  scheduleDisplay: string
  createdAt: string | Date
  updatedAt: string | Date
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800 border-green-200'
    case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getCourseTypeColor = (type: string) => {
  return type === 'GROUP'
    ? 'bg-purple-100 text-purple-800 border-purple-200'
    : 'bg-orange-100 text-orange-800 border-orange-200'
}

export const columns: ColumnDef<CourseWithStats>[] = [
  {
    accessorKey: "title",
    header: "Course",
    cell: ({ row }) => {
      const course = row.original
      return (
        <div className="space-y-1">
          <div className="font-medium text-primary hover:underline"><Link href={`/admin/courses/${course.id}`}>{course.title}</Link></div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </div>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline" className={getCourseTypeColor(course.type)}>
              {course.type}
            </Badge>
            <Badge variant="outline" className={getStatusColor(course.status)}>
              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </Badge>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "teacher.name",
    header: "Teacher",
    cell: ({ row }) => {
      const teacher = row.original.teacher
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{teacher.name || "N/A"}</span>
          </div>
          <div className="text-sm text-muted-foreground">{teacher.email}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "studentCount",
    header: "Students",
    cell: ({ row }) => {
      const course = row.original
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{course.studentCount}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                {course.enrollments.slice(0, 3).map((enrollment, idx) => (
                  <div key={idx}>{enrollment.student.name || enrollment.student.email}</div>
                ))}
                {course.enrollments.length > 3 && (
                  <div>... and {course.enrollments.length - 3} more</div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
  {
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => {
      const course = row.original
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{course.scheduleDisplay}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const course = row.original
      return (
        <div className="space-y-2 min-w-[120px]">
          <div className="flex justify-between text-sm">
            <span>{course.completedClasses}/{course.totalClasses}</span>
            <span>{course.progressPercentage}%</span>
          </div>
          <Progress value={course.progressPercentage} className="h-2" />
          <div className="flex gap-1 text-xs text-muted-foreground">
            <span>✓ {course.completedClasses}</span>
            <span>⏱ {course.scheduledClasses}</span>
            {course.cancelledClasses > 0 && <span>✕ {course.cancelledClasses}</span>}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "dates",
    header: "Duration",
    cell: ({ row }) => {
      const course = row.original
      const startDate = new Date(course.startDate)
      const endDate = new Date(course.endDate)
      const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{duration} days</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original

      const handleSoftDelete = async () => {
        try {
          await fetch(`/api/courses/${course.id}/soft-delete`, {
            method: "DELETE",
          })
          toast.success("Course deleted")
          window.location.reload()
        } catch {
          toast.error("Failed to delete course")
        }
      }

      const handleViewDetails = () => {
        // Navigate to course details page
        window.location.href = `/admin/courses/${course.id}`
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className={buttonVariants({
            variant: "ghost"
          })}>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[1000]">
            <DropdownMenuItem onClick={handleViewDetails}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.href = `/admin/courses/${course.id}/edit`}>
              Edit Course
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.href = `/admin/courses/${course.id}/classes`}>
              Manage Classes
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleSoftDelete}
              className="text-red-600"
            >
              Delete Course
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function CourseTable() {
  const [data, setData] = React.useState<CourseWithStats[]>([])
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
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState<string>("all")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [teacherFilter] = React.useState<string>("all")

  const fetchCourses = async (page: number, size: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        limit: size.toString(),
      })

      if (typeFilter !== "all") {
        params.append("type", typeFilter)
      }

      if (statusFilter !== "all") {
        params.append("status", statusFilter)
      }

      if (teacherFilter !== "all") {
        params.append("teacherId", teacherFilter)
      }

      const res = await fetch(`/api/admin/courses?${params.toString()}`)
      const json = await res.json()
      setData(json.data)
      setTotal(json.total)
    } catch (error) {
      console.error("Failed to fetch courses:", error)
      toast.error("Failed to fetch courses")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchCourses(pagination.pageIndex, pagination.pageSize)
  }

  React.useEffect(() => {
    fetchCourses(pagination.pageIndex, pagination.pageSize)
  }, [pagination.pageIndex, pagination.pageSize, typeFilter, statusFilter, teacherFilter])

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search courses..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="PERSONAL">Personal</SelectItem>
              <SelectItem value="GROUP">Group</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
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

          <CreateCourseDialog onSuccess={handleRefresh} />
        </div>
      </div>

      <ScrollArea className="rounded border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
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
                  Loading courses...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No courses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {((pagination.pageIndex) * pagination.pageSize) + 1} to {Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)} of {total} courses
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}