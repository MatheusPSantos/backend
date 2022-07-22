// SPDX-License-Identifier: MIT
pragma solidity =0.8.12;

contract StudentsContract {
    struct Student {
        string studentName;
        uint256 studentAge;
    }

    mapping(address => Student) private _enrolledStudents;

    function getEnrolledStudentByAddress(address _studentAddress)
        public
        view
        returns (Student memory)
    {
        return _enrolledStudents[_studentAddress];
    }

    function isStudentAgeValid(uint256 _studentAge)
        private
        pure
        returns (bool)
    {
        return _studentAge > 0;
    }

    function isStudentNameValid(string memory _studentName)
        private
        pure
        returns (bool)
    {
        bytes memory tempString = bytes(_studentName);
        return tempString.length > 0;
    }

    function isStudentValid(Student memory _student)
        private
        pure
        returns (bool)
    {
        return
            isStudentNameValid(_student.studentName) &&
            isStudentAgeValid(_student.studentAge);
    }

    function enrollStudent(string memory _studentName, uint256 _studentAge)
        public
    {
        require(isStudentNameValid(_studentName), "Name must be informed");
        require(isStudentAgeValid(_studentAge), "Age must be informed");
        require(
            !isStudentValid(getEnrolledStudentByAddress(msg.sender)),
            "Student already enrolled"
        );

        Student memory student;
        student.studentName = _studentName;
        student.studentAge = _studentAge;

        assert(isStudentValid(student));

        _enrolledStudents[msg.sender] = student;
    }
}
