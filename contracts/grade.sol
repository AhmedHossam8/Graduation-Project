// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GradeBook {
    struct Grade {
        uint256 studentId;
        uint256 courseId;
        uint256 grade;
    }

    Grade[] public grades;

    function addGrade(uint256 _studentId, uint256 _courseId, uint256 _grade) public {
        grades.push(Grade(_studentId, _courseId, _grade));
    }

    function getGrade(uint256 index) public view returns (uint256, uint256, uint256) {
        Grade memory grade = grades[index];
        return (grade.studentId, grade.courseId, grade.grade);
    }

    function getAllGrades() public view returns (uint256[] memory, uint256[] memory, uint256[] memory) {
        uint256[] memory studentIds = new uint256[](grades.length);
        uint256[] memory courseIds = new uint256[](grades.length);
        uint256[] memory gradesArr = new uint256[](grades.length);

        for (uint256 i = 0; i < grades.length; i++) {
            studentIds[i] = grades[i].studentId;
            courseIds[i] = grades[i].courseId;
            gradesArr[i] = grades[i].grade;
        }

        return (studentIds, courseIds, gradesArr);
    }
}
