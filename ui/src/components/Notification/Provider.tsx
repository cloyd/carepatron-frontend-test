import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

type State = {
	notify: (message: string, severity?: AlertColor) => void;
};

const NotificationContext = createContext<State | null>(null);

export const useNotification = () => {
	const notification = useContext(NotificationContext);
	if (!notification) {
		throw new Error('useNotification must be used within a NotificationContext');
	}
	return notification;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [severity, setSeverity] = useState<AlertColor>('info');

	const notify = useCallback((message: string, severity: AlertColor = 'info') => {
		setSnackbarMessage(message);
		setSeverity(severity);
		setSnackbarOpen(true);
	}, []);

	const handleCloseSnackbar = useCallback(() => {
		setSnackbarOpen(false);
	}, []);

	const value = {
		notify,
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={snackbarOpen}
				autoHideDuration={4000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					elevation={6}
					variant='filled'
					sx={{ width: '100%' }}
					onClose={handleCloseSnackbar}
					severity={severity}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</NotificationContext.Provider>
	);
};

export default SnackbarProvider;
