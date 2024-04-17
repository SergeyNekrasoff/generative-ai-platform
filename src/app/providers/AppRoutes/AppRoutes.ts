import { AppPages } from '../router'

interface IRoute<T extends object = {}> {
  name: string
  params: T
}

export class AppRoutes {
  private constructor() {}

  static getHome() {
    return getRoute(AppPages.home, {})
  }

  static getProjects() {
    return getRoute(AppPages.projects, {})
  }

  static getProject() {
    return getRoute(AppPages.project, {})
  }

  static getChat() {
    return getRoute(AppPages.chat, {})
  }

  static getEditor() {
    return getRoute(AppPages.editor, {})
  }

  static getTemplates() {
    return getRoute(AppPages.templates, {})
  }

  static getHistory() {
    return getRoute(AppPages.history, {})
  }

  static getAccount() {
    return getRoute(AppPages.account, {})
  }

  static getSettings() {
    return getRoute(AppPages.settings, {})
  }

  static getUIKit() {
    return getRoute(AppPages.UIKit, {})
  }

  static getNotFound() {
    return getRoute(AppPages.notFound, {})
  }
}

// TODO необязательный 2й параметр
function getRoute<T extends object = {}>(name: string, params: T): IRoute<T> {
  return {
    name,
    params
  }
}
