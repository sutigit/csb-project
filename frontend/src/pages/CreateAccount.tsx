
// My components
import Nav from '../components/Nav'

export default function CreateAccount() {
  return (
    <>
      <Nav />
      <form action="">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Create Account</button>
      </form>
    </>
  )
}
