import { useQuery } from '@tanstack/react-query';
import { useTypedRoute } from '@/hooks/useTypedRoute';
import { AppointmentService } from '@/services/appointment.service';


export const useCheckout = () => {
    const { params } = useTypedRoute<'Appointment'>();

    const { isLoading, data: checkout } = useQuery({
        queryKey: ['create-appointment'],
        queryFn: () => AppointmentService.createAppointment({
            salonId: '',
            date: '',
            salonServiceId: '',
            couponId: '',
            customerId: '',
            employeeId: ''

        })

    });
    return { isLoading, checkout}

};
