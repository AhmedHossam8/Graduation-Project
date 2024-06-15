// SPDX-License-Identifier: MIT
pragma solidity ^0.5.11;

contract Grades {
    struct Grade {
        uint studentId;
        uint courseId;
        string grade;
    }

    mapping(uint => mapping(uint => Grade)) private grades; // Mapping from studentId => courseId => Grade
    address public admin;

    event GradeAdded(uint studentId, uint courseId, string grade);
    event GradeUpdated(uint studentId, uint courseId, string newGrade);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Constructor
    constructor() public {
        admin = msg.sender;
    }

    function addGrade(uint studentId, uint courseId, string memory grade) public onlyAdmin {
        require(bytes(grades[studentId][courseId].grade).length == 0, "Grade already exists for this student and course");
        grades[studentId][courseId] = Grade(studentId, courseId, grade);
        emit GradeAdded(studentId, courseId, grade);
    }

    function updateGrade(uint studentId, uint courseId, string memory newGrade) public onlyAdmin {
        require(bytes(grades[studentId][courseId].grade).length != 0, "Grade does not exist for this student and course");
        grades[studentId][courseId].grade = newGrade;
        emit GradeUpdated(studentId, courseId, newGrade);
    }

    function getGrade(uint studentId, uint courseId) public view returns (string memory) {
        require(bytes(grades[studentId][courseId].grade).length != 0, "Grade does not exist for this student and course");
        return grades[studentId][courseId].grade;
    }

    function changeAdmin(address newAdmin) public onlyAdmin {
        admin = newAdmin;
    }
}
