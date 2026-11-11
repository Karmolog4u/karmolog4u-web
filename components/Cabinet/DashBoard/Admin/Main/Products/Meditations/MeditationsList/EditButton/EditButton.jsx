import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OverlayPanel } from 'primereact/overlaypanel';
import EditButtonIcon from './EditButtonIcon';
import EditMenu from './EditMenu';
import { base_url, HIDDEN, PUBLISHED } from '@/helper/consts';
import ConfirmDialogSet from '../../../ConfirmDialogSet/ConfirmDialogSet';

import 'primereact/resources/primereact.min.css';
import { toast } from 'react-toastify';

const deleteMeditation = async (id, token) => {
  const res = await fetch(`${base_url}/admin/products/meditations/delete/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorMessage = await res.json();
    throw new Error(errorMessage.message || 'Не вдалося видалити медитацію');
  }

  return res.json();
};

const hideMeditation = async (id, token, status) => {
  const res = await fetch(`${base_url}/admin/products/meditations/status/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const errorMessage = await res.json();
    throw new Error(errorMessage.message || 'Упс щось трапилось');
  }

  return res.json();
};

const EditButton = ({ id, name, status }) => {
  const [visibleDialogToHide, setVisibleDialogToHide] = useState(false);
  const [visibleDialogToDelete, setVisibleDialogToDelete] = useState(false);
  const { data: token } = useSession();
  const queryClient = useQueryClient();

  const op = useRef(null);

  const mutation = useMutation({
    mutationFn: async ({ action }) => {
      if (action === 'delete') await deleteMeditation(id, token.accessToken);
      if (action === 'hide')
        await hideMeditation(id, token.accessToken, status === HIDDEN ? PUBLISHED : HIDDEN);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meditations'] });
      queryClient.invalidateQueries({ queryKey: ['products-count'] });
    },
    onError: error => {
      toast.error(error.message || 'Упс щось трапилось');
    },
  });

  const onHide = () => {
    mutation.mutate({ action: 'hide' });
    setVisibleDialogToHide(false);
    document.body.style.overflow = 'auto';
  };

  const onDelete = () => {
    mutation.mutate({ action: 'delete' });
    setVisibleDialogToDelete(false);
    document.body.style.overflow = 'auto';
  };

  const onReject = callback => {
    callback(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <ConfirmDialogSet
        status={status}
        name={name}
        acceptOnHide={onHide}
        rejectOnHide={() => onReject(setVisibleDialogToHide)}
        acceptOnDelete={onDelete}
        rejectOnDelete={() => onReject(setVisibleDialogToDelete)}
        visibleDialogToHide={visibleDialogToHide}
        visibleDialogToDelete={visibleDialogToDelete}
      />
      <button
        onClick={e => {
          op.current.toggle(e);
        }}
      >
        <EditButtonIcon />
        <OverlayPanel ref={op}>
          <EditMenu
            setVisibleDialogToHide={setVisibleDialogToHide}
            setVisibleDialogToDelete={setVisibleDialogToDelete}
            status={status}
            id={id}
          />
        </OverlayPanel>
      </button>
    </>
  );
};

export default EditButton;
