import type { Blog } from "../../db/Schema"
type State = Blog['State']

export interface ReqBasic extends Partial<State> {

}
export interface ResBasic extends State {
    Articles: number
    StartTime: number
}