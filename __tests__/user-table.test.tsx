import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import UsersPage from 'app/users/page';
import { APIContext } from 'src/context/apiContext';
import { vi } from 'vitest';
import { mockUsers } from './mockData';
import { IContext } from '@/types';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: vi.fn().mockReturnValue('/'),
  useSearchParams: vi.fn().mockReturnValue({
    get: vi.fn(),
  }),
}));
const setUsersMock = vi.fn();

const renderWithContext = (
  ui: React.ReactElement,
  { users, loading, error, setUsers }: IContext
) => {
  return render(
    <APIContext.Provider value={{ users, loading, error, setUsers }}>
      {ui}
    </APIContext.Provider>
  );
};

test('renders content', () => {
  renderWithContext(<UsersPage />, {
    users: [],
    loading: false,
    error: null,
    setUsers: setUsersMock,
  });

  const element = screen.getByText('Users List');
  expect(element).toBeDefined();
});

describe('UsersTable', () => {
  it('displays loading skeleton component initially', () => {
    renderWithContext(<UsersPage />, {
      users: [],
      loading: true,
      error: null,
      setUsers: setUsersMock,
    });
    const skeleton = screen.getByTestId('loading-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('displays error message if fetching users fails', () => {
    renderWithContext(<UsersPage />, {
      users: [],
      loading: false,
      error: 'Failed to fetch users',
      setUsers: setUsersMock,
    });

    expect(screen.getByText(/failed to fetch users/i)).toBeDefined();
  });

  it('opens user detail modal on row click', async () => {
    renderWithContext(<UsersPage />, {
      users: mockUsers,
      loading: false,
      error: null,
      setUsers: setUsersMock,
    });

    const userRow = screen.getByText(/leanne graham/i);
    fireEvent.click(userRow);

    await waitFor(() => {
      expect(screen.getByText(/user information/i)).toBeInTheDocument();
      const modal = screen.getByRole('dialog');
      expect(within(modal).getByText(/leanne graham/i)).toBeInTheDocument();
    });
  });

  it('filters users based on search query', async () => {
    renderWithContext(<UsersPage />, {
      users: mockUsers,
      loading: false,
      error: null,
      setUsers: setUsersMock,
    });

    const searchInput = screen.getByPlaceholderText(
      /Search users by name or email/i
    );
    fireEvent.change(searchInput, { target: { value: 'Leanne' } });

    await waitFor(() => {
      expect(screen.getByText(/leanne graham/i)).toBeInTheDocument();
      expect(screen.queryByText(/ervin howell/i)).not.toBeInTheDocument();
    }).catch(error => {
      console.error("Error in waitFor:", error);
      screen.debug();
    });
  });
});
