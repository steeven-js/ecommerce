import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

export default function NavSubList({ data, slotProps, ...other }) {
  const pathname = usePathname();

  if (!Array.isArray(data)) {
    console.error('NavSubList: data prop is not an array', data);
    return null;
  }

  return (
    <Stack spacing={1} {...other}>
      {data.map((item, index) => {
        const active = pathname === item || pathname === `${item}/`;

        return (
          <Link
            noWrap
            key={item + index}
            component={RouterLink}
            href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
            className={active ? 'active' : ''}
            variant="body2"
            sx={{
              fontSize: 13,
              color: 'text.secondary',
              transition: (theme) => theme.transitions.create('all'),
              '&:hover': {
                color: 'text.primary',
              },
              ...(active && {
                color: 'text.primary',
                textDecoration: 'underline',
                fontWeight: 'fontWeightSemiBold',
              }),
              ...slotProps?.subItem,
            }}
          >
            {item}
          </Link>
        );
      })}
    </Stack>
  );
}

NavSubList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  slotProps: PropTypes.object,
};
