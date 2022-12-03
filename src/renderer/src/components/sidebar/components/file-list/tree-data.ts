export interface Tree  {
  fileName: string
  level: number
  children: Tree[] | never[]
  path: string
  isDir: boolean
  opened: false
}
export const treeData = {
    fileName: 'Markdowns',
    children: [
      {
        fileName: 'App更改建议.md',
        children: [],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/App更改建议.md',
        level: 1,
        isDir: false,
        opened: false
      },
      {
        fileName: 'FPV.md',
        children: [],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/FPV.md',
        level: 1,
        isDir: false,
        opened: false
      },
      {
        fileName: 'MAC常见问题.md',
        children: [],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/MAC常见问题.md',
        level: 1,
        isDir: false,
        opened: false
      },
      {
        fileName: 'Nice-Blogs.md',
        children: [],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Nice-Blogs.md',
        level: 1,
        isDir: false,
        opened: false
      },
      {
        fileName: 'Photography.md',
        children: [],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Photography.md',
        level: 1,
        isDir: false,
        opened: false
      },
      {
        fileName: 'Untitled.md',
        children: [],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Untitled.md',
        level: 1,
        isDir: false,
        opened: false
      },
      {
        fileName: 'Vue-docs',
        children: [
          {
            fileName: '1 Getting Started',
            children: [
              {
                fileName: 'Introduction.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/1 Getting Started/Introduction.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: 'Quick Start.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/1 Getting Started/Quick Start.md',
                level: 3,
                isDir: false,
                opened: false
              }
            ],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/1 Getting Started',
            level: 2,
            isDir: true,
            opened: false
          },
          {
            fileName: '2 Essentials',
            children: [
              {
                fileName: '1 Creating an Application.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials/1 Creating an Application.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '2 Template Syntax.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials/2 Template Syntax.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '3 Reactivity Fundamentals.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials/3 Reactivity Fundamentals.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '4 Computed Properties.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials/4 Computed Properties.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '5 Class and Style Bindings.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials/5 Class and Style Bindings.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '6 Comditional Rendering.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials/6 Comditional Rendering.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '7. List Rendering.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials/7. List Rendering.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: 'Component Basics.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials/Component Basics.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: 'Event Handling.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials/Event Handling.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: 'Watchers.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials/Watchers.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '未命名文件.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials/未命名文件.md',
                level: 3,
                isDir: false,
                opened: false
              }
            ],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/2 Essentials',
            level: 2,
            isDir: true,
            opened: false
          },
          {
            fileName: '3 Components In-Depth',
            children: [
              {
                fileName: '1 Registration.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/3 Components In-Depth/1 Registration.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '2 Props.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/3 Components In-Depth/2 Props.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '3 Events.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/3 Components In-Depth/3 Events.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '4 Fallthrough Attribute.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/3 Components In-Depth/4 Fallthrough Attribute.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '5 slot.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/3 Components In-Depth/5 slot.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '6 Provide',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/3 Components In-Depth/6 Provide',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '7 Async Components.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/3 Components In-Depth/7 Async Components.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '未命名文件',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/3 Components In-Depth/未命名文件',
                level: 3,
                isDir: false,
                opened: false
              }
            ],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/3 Components In-Depth',
            level: 2,
            isDir: true,
            opened: false
          },
          {
            fileName: '4 Reusability',
            children: [
              {
                fileName: 'Composables.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/4 Reusability/Composables.md',
                level: 3,
                isDir: false,
                opened: false
              }
            ],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/4 Reusability',
            level: 2,
            isDir: true,
            opened: false
          },
          {
            fileName: '5 Build-Compnent',
            children: [
              {
                fileName: 'Teleport.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/5 Build-Compnent/Teleport.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: 'Transition.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/5 Build-Compnent/Transition.md',
                level: 3,
                isDir: false,
                opened: false
              }
            ],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/5 Build-Compnent',
            level: 2,
            isDir: true,
            opened: false
          },
          {
            fileName: 'Extra Topics',
            children: [
              {
                fileName: 'Reactive In Depth.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/Extra Topics/Reactive In Depth.md',
                level: 3,
                isDir: false,
                opened: false
              }
            ],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/Extra Topics',
            level: 2,
            isDir: true,
            opened: false
          },
          {
            fileName: 'Scaling Up',
            children: [
              {
                fileName: 'State Management.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/Scaling Up/State Management.md',
                level: 3,
                isDir: false,
                opened: false
              }
            ],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/Scaling Up',
            level: 2,
            isDir: true,
            opened: false
          },
          {
            fileName: 'TypeScript',
            children: [
              {
                fileName: '1 overview.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/TypeScript/1 overview.md',
                level: 3,
                isDir: false,
                opened: false
              },
              {
                fileName: '2 TypeScript with Composition API.md',
                children: [],
                path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/TypeScript/2 TypeScript with Composition API.md',
                level: 3,
                isDir: false,
                opened: false
              }
            ],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/TypeScript',
            level: 2,
            isDir: true,
            opened: false
          },
          {
            fileName: '项目经验.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs/项目经验.md',
            level: 2,
            isDir: false,
            opened: false
          }
        ],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/Vue-docs',
        level: 1,
        isDir: true,
        opened: false
      },
      {
        fileName: 'front-end',
        children: [
          {
            fileName: '1.HTML - CSS.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/1.HTML - CSS.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: '2.JavaScript.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/2.JavaScript.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: '4.Vue.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/4.Vue.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: '5.React.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/5.React.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: '6.TypeScript.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/6.TypeScript.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: '7.Algorithm.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/7.Algorithm.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: '8.DesignPettern.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/8.DesignPettern.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: '9.interview.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/9.interview.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: 'Architecture.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/Architecture.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: 'Eslint.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/Eslint.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: 'Git.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/Git.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: 'NPM.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/NPM.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: 'NodeJs.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/NodeJs.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: 'packages.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/packages.md',
            level: 2,
            isDir: false,
            opened: false
          },
          {
            fileName: 'vscode.md',
            children: [],
            path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end/vscode.md',
            level: 2,
            isDir: false,
            opened: false
          }
        ],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/front-end',
        level: 1,
        isDir: true,
        opened: false
      },
      {
        fileName: 'movie.md',
        children: [],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/movie.md',
        level: 1,
        isDir: false,
        opened: false
      },
      {
        fileName: 'npm-packages.md',
        children: [],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/npm-packages.md',
        level: 1,
        isDir: false,
        opened: false
      },
      {
        fileName: 'study-plan-diary.md',
        children: [],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/study-plan-diary.md',
        level: 1,
        isDir: false,
        opened: false
      },
      {
        fileName: 'todos.md',
        children: [],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/todos.md',
        level: 1,
        isDir: false,
        opened: false
      },
      {
        fileName: '冬日必备.md',
        children: [],
        path: '/Users/qirong77/Desktop/front-end-book/Markdowns/冬日必备.md',
        level: 1,
        isDir: false,
        opened: false
      }
    ],
    path: '/Users/qirong77/Desktop/front-end-book/Markdowns',
    level: 0,
    isDir: true,
    opened: false
  }