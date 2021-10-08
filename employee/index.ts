import { EmployeeOrgApp } from './classes/EmployeeOrgApp'
import { ceo } from './instances/ceo'

const app = new EmployeeOrgApp(ceo)

app.show()
app.moveSubAt({ from: 3, to: 2 })
app.show()
