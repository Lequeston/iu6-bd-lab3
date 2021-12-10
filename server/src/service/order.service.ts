import moment from 'moment';

interface OrderServiceInterface {
  decoration: (
    startPoint: string | undefined,
    endPoint: string | undefined,
    directDate: moment.Moment | undefined,
    reverseDate: moment.Moment | undefined
  ) => Promise<void>
}

class OrderService implements OrderServiceInterface {
  async decoration(
    startPoint: string | undefined,
    endPoint: string | undefined,
    directDate: moment.Moment | undefined,
    reverseDate: moment.Moment | undefined
  ) {
  }
}

export default new OrderService();