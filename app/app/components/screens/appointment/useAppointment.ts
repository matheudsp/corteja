import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AppointmentService } from '@/services/appointment.service';

export const useAppointment = (date: string) => {
    
    const salonServiceId = useSelector((state: RootState) => state.salon.salonServiceId);
    const salonId = useSelector((state: RootState) => state.salon.salonId);

    const { isLoading, data: appointment } = useQuery({
        queryKey: ['get-disponibility', date, salonServiceId, salonId],
        queryFn: () => AppointmentService.verifyDisponibility({
            date, 
            salonServiceId, 
            salonId
        })
    });

    return { isLoading, appointment };
};
