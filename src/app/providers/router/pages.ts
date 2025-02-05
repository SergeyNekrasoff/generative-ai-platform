import { routeName as home } from './routes/home'
import { routeName as projects } from './routes/projects'
import { routeName as project } from './routes/project'
import { routeName as chat } from './routes/chat'
import { routeName as editor } from './routes/editor'
import { routeName as templates } from './routes/templates'
import { routeName as history } from './routes/history'
import { routeName as account } from './routes/account'
import { routeName as settings } from './routes/settings'
import { routeName as UIKit } from './routes/ui-kit'
import { routeName as notFound } from './routes/not-found'

export const pages = {
  home,
  projects,
  project,
  chat,
  editor,
  templates,
  history,
  account,
  settings,
  UIKit,
  notFound
} as const
