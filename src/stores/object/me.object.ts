export default class Mine {
  id: number = 0
  affId: string = ''
  totalOrder: number = 0
  totalMember: number = 0
  point: number = 0

  fromJSON = (me: any) => {
    this.id = me.id
    this.affId = me.aff_id
    this.totalOrder = me.total_order
    this.totalMember = me.total_member
    this.point = me.point
  }
}

export interface IFormRegister {
  username: string;
  password: string;
  phone: string;
  parent_aff_id: string;
}
