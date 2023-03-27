import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input, Textarea } from '@/components/Input';
import { Spacer } from '@/components/Layout';
import { fetcher } from '@/lib/fetch';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const EmailVerify = ({ user }) => {
  const [status, setStatus] = useState();
  const verify = useCallback(async () => {
    try {
      setStatus('loading');
      await fetcher('/api/user/email/verify', { method: 'POST' });
      toast.success(
        'An email has been sent to your mailbox. Follow the instruction to verify your email.'
      );
      setStatus('success');
    } catch (e) {
      toast.error(e.message);
      setStatus('');
    }
  }, []);
  if (user.emailVerified) return null;
  return (
    <>
      <p>
        <strong>Note:</strong> <span>Your email</span> (
        <span>{user.email}</span>) is unverified.
      </p>
      <Spacer size={1} axis="horizontal" />
      <Button
        loading={status === 'loading'}
        size="small"
        onClick={verify}
        disabled={status === 'success'}
      >
        Verify
      </Button>
    </>
  );
};

const Auth = () => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await fetcher('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: oldPasswordRef.current.value,
          newPassword: newPasswordRef.current.value,
        }),
      });
      toast.success('Your password has been updated');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
      oldPasswordRef.current.value = '';
      newPasswordRef.current.value = '';
    }
  }, []);

  return (
    <section>
      <h4>Password</h4>
      <form onSubmit={onSubmit}>
        <Input
          htmlType="password"
          autoComplete="current-password"
          ref={oldPasswordRef}
          label="Old Password"
        />
        <Spacer size={0.5} axis="vertical" />
        <Input
          htmlType="password"
          autoComplete="new-password"
          ref={newPasswordRef}
          label="New Password"
        />
        <Spacer size={0.5} axis="vertical" />
        <Button
          htmlType="submit"
          type="success"
          loading={isLoading}
        >
          Save
        </Button>
      </form>
    </section>
  );
};

const AboutYou = ({ user, mutate }) => {
  const companyNameRef = useRef();
  const contactPersonRef = useRef();
  const bioRef = useRef();
  const profilePictureRef = useRef();
  const telephoneNumberRef = useRef();
  const deliveryAddressRef = useRef();
  const postCodeRef = useRef();
  const townRef = useRef();
  const billingAddressRef = useRef();
  const billingPostCodeRef = useRef();
  const billingTownRef = useRef();
  const organisationNumberRef = useRef();

  const [avatarHref, setAvatarHref] = useState(user.profilePicture);
  const onAvatarChange = useCallback((e) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (l) => {
      setAvatarHref(l.currentTarget.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitUser = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('companyname', companyNameRef.current.value);
        formData.append('contactperson', contactPersonRef.current.value);
        formData.append('telephonenumber', telephoneNumberRef.current.value);
        formData.append('deliveryaddress', deliveryAddressRef.current.value);
        formData.append('postcode', postCodeRef.current.value);
        formData.append('town', townRef.current.value);
        formData.append('billingaddress', billingAddressRef.current.value);
        formData.append('billingpostcode', billingPostCodeRef.current.value);
        formData.append('billingtown', billingTownRef.current.value);
        formData.append('organisationnumber', organisationNumberRef.current.value);

        if (profilePictureRef.current.files[0]) {
          formData.append('profilePicture', profilePictureRef.current.files[0]);
        }
        
        const response = await fetcher('/api/user', {
          method: 'PATCH',
          body: formData,
        });
        mutate({ user: response.user }, false);
        toast.success('Your profile has been updated');
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  useEffect(() => {
    companyNameRef.current.value = user.companyname || '';
    contactPersonRef.current.value = user.contactperson || '';
    telephoneNumberRef.current.value = user.telephonenumber || '';
    deliveryAddressRef.current.value = user.deliveryaddress || '';
    postCodeRef.current.value = user.postcode || '';
    townRef.current.value = user.town || '';
    billingAddressRef.current.value = user.billingaddress || '';
    billingPostCodeRef.current.value = user.billingpostcode || '';
    billingTownRef.current.value = user.billingtown || '';
    organisationNumberRef.current.value = user.organisationnumber || '';
    profilePictureRef.current.value = '' || '';
    setAvatarHref(user.profilePicture);
  }, [user]);

  return (
    <section className="w-full bg-gray-100 px-4 py-10">
      <div className="max-w-[800px] bg-white rounded-xl px-10 py-10 mr-auto ml-auto">

      <h4>About You</h4>
      <form onSubmit={onSubmitUser}>

        <Input
          ref={companyNameRef}
          htmlType="text"
          autoComplete="email"
          placeholder="Företagsnamn"
          label="Företagsnamn"
          ariaLabel="Företagsnamn"
          size="large"
          required
        />

        
        <Spacer size={0.5} axis="vertical" />
        <Input ref={contactPersonRef} label="Kontaktperson" />
        <Spacer size={0.5} axis="vertical" />
        <Input ref={telephoneNumberRef} label="Telefonnummer" />
        <Spacer size={0.5} axis="vertical" />
         
        <Input ref={deliveryAddressRef} label="Leveransadress" />
        <Spacer size={0.5} axis="vertical" />

        <Input ref={postCodeRef} label="Postnummer" />
        <Spacer size={0.5} axis="vertical" />
         
        <Input ref={townRef} label="Ort" />
        <Spacer size={0.5} axis="vertical" />
         
        <Input ref={billingAddressRef} label="Fakturaadress" />
        <Spacer size={0.5} axis="vertical" />

        <Input ref={billingPostCodeRef} label="Faktura postnr" />
        <Spacer size={0.5} axis="vertical" />

        <Input ref={billingTownRef} label="Faktura ort" />
        <Spacer size={0.5} axis="vertical" />
        
        <Input ref={organisationNumberRef} label="Organisationsnummer" />
        <Spacer size={0.5} axis="vertical" />
        
         
        <Textarea ref={bioRef} label="Your Bio" />
        <Spacer size={0.5} axis="vertical" />
        <span>Your Avatar</span>
        <div>
          <Avatar size={96} username={user.username} url={avatarHref} />
          <input
            aria-label="Your Avatar"
            type="file"
            accept="image/*"
            ref={profilePictureRef}
            onChange={onAvatarChange}
          />
        </div>
        <Spacer size={0.5} axis="vertical" />
        <Button
          htmlType="submit"
          type="success"
          loading={isLoading}
        >
          Save
        </Button>
      </form>
      </div>
    </section>
  );
};

export const Settings = () => {
  const { data, error, mutate } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (!data && !error) return;
    if (!data.user) {
      router.replace('/login');
    }
  }, [router, data, error]);
  return (
    <>
      <Spacer size={2} axis="vertical" />
      {data?.user ? (
        <>
          <EmailVerify user={data.user} />
          <AboutYou user={data.user} mutate={mutate} />
          <Auth user={data.user} />
        </>
      ) : null}
    </>
  );
};
