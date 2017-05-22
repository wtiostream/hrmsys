package com.hrmsys.model;

import java.util.Date;

/**
 * User entity. @author MyEclipse Persistence Tools
 */

public class User implements java.io.Serializable {

	// Fields

	private Integer userId;
	private Role role;
	private Employee employee;
	private String userName;
	private String userPwd;
	private Integer userStatus;
	private String userRemark;

	// Constructors

	/** default constructor */
	public User() {
		
	}

	/** minimal constructor */
	public User(String userPwd, Date userDate) {
		this.userPwd = userPwd;
	}

	public User(Integer userId, Role role, Employee employee, String userName,
			String userPwd, Integer userStatus, String userRemark) {
		super();
		this.userId = userId;
		this.role = role;
		this.employee = employee;
		this.userName = userName;
		this.userPwd = userPwd;
		this.userStatus = userStatus;
		this.userRemark = userRemark;
	}

	// Property accessors

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Employee getEmployee() {
		return this.employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPwd() {
		return this.userPwd;
	}

	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}

	public String getUserRemark() {
		return this.userRemark;
	}

	public void setUserRemark(String userRemark) {
		this.userRemark = userRemark;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public Role getRole() {
		return role;
	}
	public Integer getUserStatus() {
		return userStatus;
	}
	public void setUserStatus(Integer userStatus) {
		this.userStatus = userStatus;
	}
}