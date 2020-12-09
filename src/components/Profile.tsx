import {virtualElement} from '../core/Element'
import {WebComponent} from '../core/WebComponent'

interface IProps {
  name: string
  age: number
}

function template(props: IProps){
  return (
    <div>
      <div>Name: {props.name}</div>
      <div>age: {props.age}</div>
    </div>
  )
}


export class Profile extends WebComponent<IProps> {
  static get observedAttributes() {
    return ['name', 'age'];
  }
  constructor() {
    super({ nodeFn: template, defaultProps: { name: '', age: 0}})
  }
}


