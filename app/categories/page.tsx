"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, Edit2, Plus } from "lucide-react"
import { trpc } from "../_trpc/trpc"

interface Category {
  id: number
  name: string
  slug: string
  description: string | null
}

export default function CategoriesPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", description: "" })

  const utils = trpc.useContext()

  const { data: categories, isLoading } = trpc.category.getAll.useQuery()

  
  const createCategory = trpc.category.create.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate()
      setIsOpen(false)
    },
  })

  const updateCategory = trpc.category.update.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate()
      setIsOpen(false)
    },
  })

  const deleteCategory = trpc.category.delete.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate()
    },
  })

  const handleAddCategory = () => {
    setEditingId(null)
    setFormData({ name: "", description: "" })
    setIsOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setEditingId(category.id)
    setFormData({ name: category.name, description: category.description ?? "" })
    setIsOpen(true)
  }

  const handleSaveCategory = () => {
    if (editingId) {
      updateCategory.mutate({
        id: editingId,
        name: formData.name,
        description: formData.description,
      })
    } else {
      createCategory.mutate({
        name: formData.name,
        description: formData.description,
      })
    }
  }

  const handleDeleteCategory = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteCategory.mutate({ id })
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 border border-muted rounded-lg animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
            <div className="flex gap-2 mt-4">
              <div className="h-8 bg-muted rounded w-20"></div>
              <div className="h-8 bg-muted rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }


  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Manage Categories</h1>
            <p className="text-muted-foreground">Create and organize your blog categories</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddCategory} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Category" : "Add New Category"}</DialogTitle>
                <DialogDescription>
                  {editingId ? "Update the category details" : "Create a new category for your blog"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Next.js"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of this category"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveCategory} className="flex-1">
                    {editingId ? "Update" : "Create"}
                  </Button>
                  <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {categories?.map((category) => (
            <Card key={category.id} className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditCategory(category)} className="gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="gap-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {(!categories || categories.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No categories yet. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  )
}
