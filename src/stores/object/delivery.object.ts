export interface IWard {
  id: string;
  name: string;
  district_id: string;
}

export interface IDistrict {
  id: string;
  name: string;
  province_id: string;
  ward: IWard[];
}

export interface IProvince {
  id: string;
  name: string;
  type: string;
  districts: IDistrict[];
}

export interface IAddress {
  address_id: number;
  address_name: string;
  district_id: string;
  district_name: string;
  id: number;
  province_id: string;
  province_name: string;
  ward_id: string;
  ward_name: string;
}

export interface IDeliveryOption {
  expected_delivery_time: string;
  fee: number;
  name: string;
  service_id: number;
}
