import { environment } from '../../environments/environment';

export const apiRoutes = {
    customer: {
        Get: `${environment.apiUrl}/customers`,
        Post: `${environment.apiUrl}/customer`
    }
}