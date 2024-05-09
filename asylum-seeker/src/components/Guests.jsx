export default function Guests() {
  return (
    <div className='guests-component'>
      <h3 className='guests-text'>Check a box then hit Submit</h3>
      <div className='guests-list-container'>
        <h3 className='sign-in-out-text'>Sign IN Sign out</h3>
        <div className='guest-tab'><span className='guest-name'>Guest 1</span></div>
        <div className='guest-tab'><span className='guest-name'>Guest 2</span></div>
      </div>
      <button className='guest-submit-btn'>Submit</button>
    </div>
  );
}
