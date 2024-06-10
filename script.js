document.getElementById('generate-keypair').addEventListener('click', function () {
    const pair = StellarSdk.Keypair.random();
  
    document.getElementById('public-key').textContent = pair.publicKey();
    document.getElementById('secret-key').textContent = pair.secret();
    document.getElementById('keypair').style.display = 'block';
  });
  
  document.getElementById('fund-account').addEventListener('click', async function () {
    const publicKey = document.getElementById('public-key').textContent;
  
    document.getElementById('funding-status').style.display = 'block';
  
    try {
      const response = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`);
      if (response.ok) {
        document.getElementById('funding-status').style.display = 'none';
        document.getElementById('funding-result').style.display = 'block';
      } else {
        throw new Error('Failed to fund account');
      }
    } catch (error) {
      document.getElementById('funding-status').textContent = `Error: ${error.message}`;
    }
  });
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

document.getElementById('fetch-balance').addEventListener('click', async function () {
    const publicKey = document.getElementById('public-key').textContent;

    try {
        const account = await server.loadAccount(publicKey);
        
        const balance = account.balances.find(balance => balance.asset_type === 'native').balance;
        document.querySelector('.dets').innerHTML=account.balances[0].asset_code;
        document.getElementById('balance').textContent = `Balance: ${balance} XLM`;
    } catch (error) {
        document.getElementById('balance').textContent = `Error: ${error.message}`;
    }
});
  