import { useQuery } from '@tanstack/react-query';
import { useTypedRoute } from '@/hooks/useTypedRoute';
import { AppointmentService } from '@/services/appointment.service';


export const useAppointment = (date: string) => {
    const { params } = useTypedRoute<'Appointment'>();

    const { isLoading, data: appointment } = useQuery({
        queryKey: ['get-disponibility', date, params.salonServiceId, params.salonId],
        queryFn: () => AppointmentService.verifyDisponibility({
            date, 
            salonServiceId: params.salonServiceId, 
            salonId: params.salonId
        })

    });
    return { isLoading, appointment }

};
