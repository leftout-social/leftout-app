// import {useRouter} from "next/router";
import styled from "styled-components";
import {BottomDrawer} from "~/components/BottomDrawer";
import {useContext, useEffect, useRef, useState} from "react";
import {Input, Button} from '@nextui-org/react';
import InitalDataContext from "~/context/initial-data-context";
import axios from "axios";
const Reset = (props: any) => {
    // const router = useRouter();
    const {toast} = useContext(InitalDataContext)
    const [formState, setFormState] = useState({
        email_id: '',
        password: '',
        new_password: '',
        confirm_password: '',
    })
    const {temp} = props
    const emailAndTempPassword = useRef<string[]>(['', ''])
    useEffect(() => {
        emailAndTempPassword.current = (temp as string)?.split('-') as []
    }, [temp !== undefined])
    const onSubmit = async () => {
        if(formState.new_password !== formState.confirm_password) toast.toastHandler({type: 'error', open: true, message: 'password and verify password does not matches'});
        try {
            const response = await axios.post('http://localhost:1212/reset/password', formState)
            console.log(response.data)
        }
        catch (error){
            console.log(error)
            toast.toastHandler({type: 'error', open: true, message: 'something went wrong'});
        }
    }
    const disabled = formState.new_password.length < 6 || formState.confirm_password.length < 6;
    // @ts-ignore
    return (
        <Parent>
            <BottomDrawer id={'reset-password'} open={true}>
                <DrawerParent>
                    <Input className='input' placeholder='New password' value={formState.new_password}
                           onChange={(event) => setFormState({...formState, new_password: event.target.value, email_id: String(emailAndTempPassword.current[0]),
                        password: temp as string})} />
                    <Input className='input' placeholder='Verify password' value={formState.confirm_password} onChange={(event) => setFormState({...formState, confirm_password: event.target.value})} />
                    <Button onClick={onSubmit} disabled={disabled}>Submit</Button>
                </DrawerParent>
            </BottomDrawer>
        </Parent>
    )
}
export default Reset;

export async function getServerSideProps(context: any){
    const {temp} = context.query;
    return {
        props: {
            temp
        }
    }
}

const Parent = styled.div`
  height: 100%;
  width: 100%;

`;

const DrawerParent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  height: 50%;
  .input {
    height: 60px;
    font-size: 18px;
  }
  
`;