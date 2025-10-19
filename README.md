# Heztor Projects

Aplicación Kanban para gestionar proyectos y tareas.

---

## Qué incluye

- React + Vite + TypeScript
- Tailwind CSS (estilos presentes en el proyecto)
- Zustand para estado global y persistencia en localStorage
- Drag & Drop básico con `@dnd-kit/core` y `@dnd-kit/sortable`

Páginas principales:

- `/` - Panel principal (bienvenida, fecha/hora, clima de ejemplo, proyectos y tareas pendientes)
- `/projects` - Listado de proyectos (crear, editar nombre)
- `/project/:id` - Detalle de proyecto con tabs (Detalles, Tareas/Kanban)

---

## Mejoras realizadas

- Store global: `src/store/projectsStore.ts` (Zustand + persistencia)
- Integración de las páginas para usar el store (Projects, Project, KanbanBoard, Navbar)
- Crear y editar proyectos; persistencia en `localStorage`
- Gestión de columnas y tareas por proyecto; DnD para tareas
- UI mínima y coherente (principio KISS): mejora en listado de proyectos, tarjetas y panel principal

---

## Requisitos

- Node.js 18+ (recomendado)
- npm

## Instalación

Desde la raíz del repositorio:

```cmd
npm install
```

## Desarrollo

Inicia el servidor de desarrollo:

```cmd
npm run dev
```

Abre la URL que muestre Vite (por defecto http://localhost:5173).

## Build y preview

```cmd
npm run build
npm run preview
```

---

## Archivos clave

- `src/store/projectsStore.ts` — store central (projects, columns, tasks)
- `src/pages/Projects.tsx` — listado de proyectos
- `src/pages/Project.tsx` — detalle por proyecto
- `src/sections/KanbanBoard.tsx` — tablero Kanban
- `src/components/TaskCard.tsx` — tarjeta de tarea (marcar/editar/eliminar)
- `src/sections/Navbar.tsx` — sidebar y navegación
