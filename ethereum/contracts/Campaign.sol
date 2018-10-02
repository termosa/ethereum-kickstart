pragma solidity ^0.4.25;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum)
        public
    {
        address newCampaign = new Campaign(msg.sender, minimum);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[]) {
      return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(address creator, uint minimum)
        public
    {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute()
        public
        payable
    {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient)
        public
        restricted
    {
         Request memory newRequest = Request({
             description: description,
             value: value,
             recipient: recipient,
             complete: false,
             approvalCount: 0
         });
         requests.push(newRequest);
    }

    function approveRequest(uint index)
        public
    {
        Request storage req = requests[index];
        require(approvers[msg.sender]);
        require(!req.approvals[msg.sender]);

        req.approvals[msg.sender] = true;
        req.approvalCount++;
    }

    function finalizeRequest(uint index)
        public
        restricted
    {
        Request storage req = requests[index];

        require(!req.complete);
        require(req.approvalCount > (approversCount / 2));

        req.recipient.transfer(req.value);
        req.complete = true;
    }

    function getSummary()
      public
      view
      returns (uint, uint, uint, uint, address)
    {
      return (
        minimumContribution,
        address(this).balance,
        requests.length,
        approversCount,
        manager
      );
    }

    function getRequestsCount()
      public
      view
      returns (uint)
    {
      return requests.length;
    }
}
