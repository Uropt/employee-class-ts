import { Action } from '../interfaces/Action'
import { defaultEmployee, Employee } from '../interfaces/Employee'

export class EmployeeOrgApp {
  // Member Variable
  // main instance
  private _ceo: Employee = defaultEmployee
  // history
  private _history: Action[] = []

  // constructor
  constructor(ceo: Employee) {
    this._ceo = ceo
  }

  // make flat employee array
  public values(subs: Employee): Employee[] {
    return subs.subordinate.reduce(
      (ret: Employee[], cur: Employee) => [
        ...(ret ?? []),
        ...(this.values(cur) ?? []),
      ],
      [],
    )
  }

  // get employee at
  public getAt(id: number): Employee {
    const subs = this.values(this._ceo)
    return subs.reduce((ret: Employee, cur: Employee): Employee => {
      if (ret.uniqueId > 0) {
        return ret
      }
      if (cur.uniqueId === id) {
        return cur
      }
      return ret
    }, defaultEmployee)
  }

  // get employee super
  public getSuper(id: number): Employee {
    const subs = this.values(this._ceo)
    return subs.reduce((ret: Employee, cur: Employee): Employee => {
      if (
        // check if in subs
        cur.subordinate.reduce(
          (retSub: Employee, curSub: Employee): Employee => {
            if (curSub.uniqueId === id) {
              return curSub
            }
            return retSub
          },
          defaultEmployee,
        ).uniqueId > 0
      ) {
        return cur
      }
      return ret
    }, defaultEmployee)
  }

  // remove at
  public removeAt(id: number): boolean {
    // get super employee
    const superEmployee = this.getSuper(id)
    // save old length
    const originLength = superEmployee.subordinate.length
    // remove target
    superEmployee.subordinate = superEmployee.subordinate.filter(
      (item: Employee) => Boolean(item.uniqueId !== id),
    )
    // compair with old length
    return originLength !== superEmployee.subordinate.length
  }

  public moveSubAt(action: Action): boolean {
    // get src employee
    const srcEmployee = this.getAt(action.from)
    if (!Boolean(srcEmployee.uniqueId)) {
      console.log(`There is no matching Employee`)
      return false
    }

    // remove src employee at old position
    this.removeAt(action.from)

    // save as sub employee at dest employy
    const destEmployee = this.getAt(action.to)
    destEmployee.subordinate.push(srcEmployee)

    // record history
    action.action = 'moveToSub'
    this._history.push(action)

    // success
    return true
  }

  // show all
  public show() {
    console.log(this._ceo)
  }
}
